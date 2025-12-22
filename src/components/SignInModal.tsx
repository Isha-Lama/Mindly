import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/api/auth";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(3, { message: "Password must be at least 3 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function SignInModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data); // call API

      // Save token and user info
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("user", JSON.stringify(res.user));

      onClose();          // close modal
      navigate("/users"); // redirect to UsersPage
    } catch (err: any) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-white opacity-70"
        onClick={onClose}
      ></div>

      {/* Modal card */}
      <div className="relative bg-white rounded-lg shadow-lg border-3 border-gray-500 w-full max-w-sm p-7 z-10">
        <div className="spirax-regular">Mindly</div>
        <p className="text-gray-600 text-sm md:text-base font-light tracking-wide">
          Inspire Someone by your Stories and Writing
        </p>

        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label htmlFor="username" className="mb-2">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">{errors.username.message}</span>
              )}
            </div>

            <div className="flex flex-col">
              <Label htmlFor="password" className="mb-2">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="mt-4">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
