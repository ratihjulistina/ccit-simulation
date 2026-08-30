CREATE TABLE public.case_study_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX case_study_categories_name_lower_idx ON public.case_study_categories (lower(name));

GRANT SELECT ON public.case_study_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.case_study_categories TO authenticated;
GRANT ALL ON public.case_study_categories TO service_role;

ALTER TABLE public.case_study_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read categories"
  ON public.case_study_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert categories"
  ON public.case_study_categories FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update categories"
  ON public.case_study_categories FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete categories"
  ON public.case_study_categories FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER case_study_categories_set_updated_at
  BEFORE UPDATE ON public.case_study_categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.case_study_categories (name)
SELECT DISTINCT btrim(category) FROM public.case_studies
WHERE btrim(category) <> ''
ON CONFLICT DO NOTHING;