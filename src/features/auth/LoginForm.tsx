import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { type YupObjectStrictSchema } from "@/shared/lib/formValidation";
import { useAuthContext } from "@/app/providers/auth/useAuthContext";
import { TextField, Button } from "@/shared/ui";
import { useState } from "react";
import { handleError } from "@/shared/lib/errorHandling";

interface LoginFormValues {
  name: string;
}

const initialValues: LoginFormValues = {
  name: "",
};

const loginSchema = Yup.object().shape<YupObjectStrictSchema<LoginFormValues>>({
  name: Yup.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters")
    .required("Name is required"),
});

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthContext();

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);
    setIsLoading(true);

    try {
      await login(values.name);
    } catch (err) {
      setError(handleError("LoginForm:submit", err, "Login failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors }) => {
        return (
          <Form className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <p className="text-red-400 text-caption">{error}</p>
              </div>
            )}

            <TextField
              component={Field}
              name="name"
              label="Name"
              placeholder="Enter your name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
              disabled={isLoading}
            />

            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
              color="primary"
              variant="contained"
              size="medium"
            >
              Continue
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
