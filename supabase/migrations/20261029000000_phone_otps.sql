-- One-time codes for account phone verification (custom SMS OTP via Moolre)
CREATE TABLE IF NOT EXISTS public.phone_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phone text NOT NULL,
  code_hash text NOT NULL,
  attempts int NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS phone_otps_user_id_idx ON public.phone_otps (user_id);
CREATE INDEX IF NOT EXISTS phone_otps_expires_at_idx ON public.phone_otps (expires_at);

ALTER TABLE public.phone_otps ENABLE ROW LEVEL SECURITY;
-- No client policies: service role only via API routes.
