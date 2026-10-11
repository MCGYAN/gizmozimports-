-- Exchange tables are read through server routes (service role) or the
-- policies created in harden_store_rls; make sure RLS is actually on.
ALTER TABLE public.exchange_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_rate_board ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.exchange_rate_board FROM anon, authenticated;

-- Trigger and server-only SECURITY DEFINER functions must not be callable
-- through /rest/v1/rpc. is_admin_or_staff() stays executable because RLS
-- policies call it as the requesting role.
DO $$
DECLARE
  fn text;
BEGIN
  FOREACH fn IN ARRAY ARRAY[
    'public.assign_profile_shipping_mark()',
    'public.get_all_customer_emails()',
    'public.get_all_customer_phones()',
    'public.guard_profile_privileges()',
    'public.handle_new_user()',
    'public.mark_order_paid(text, text)',
    'public.next_financial_document_number(text)',
    'public.reduce_stock_on_order(uuid)',
    'public.undo_manual_order_payment(text, uuid)',
    'public.update_customer_stats(text, numeric)',
    'public.update_product_rating_stats()',
    'public.upsert_customer_from_order(text, text, text, text, text, uuid, jsonb)'
  ] LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', fn);
  END LOOP;
END $$;

REVOKE ALL ON FUNCTION public.shipping_packages_analytics(
  timestamptz, timestamptz, text, text, integer, integer, boolean
) FROM anon;
