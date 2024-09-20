import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "@/services/userService";
import { UserSchema } from "@/lib/validators/user-validators";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";

interface IFormInput {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone?: string;
    dob: Date | null;
    gender: "m" | "f" | "o";
    address: string;
    role: "super_admin" | "artist_manager" | "artist";
}

const CreateUser: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        getValues,
        reset
    } = useForm<IFormInput>({
        resolver: yupResolver(UserSchema),
    });

    const navigate = useNavigate();

    const mutation = useMutation(createUser, {
        onSuccess: () => {
            toast.success("User Created Successfully!");
            reset();
            navigate('/users/list');
        },
        onError: (error: any) => {
            if (error?.status === 400) {
                const serverErrors = error?.data || {};
                for (const [key, message] of Object.entries(serverErrors)) {
                    if (Object.keys(getValues()).includes(key)) {
                        setError(key as keyof IFormInput, {
                            type: "manual",
                            message: message as string,
                        });
                    }
                }
            } else {
                toast.error("User creation failed. Please try again.");
            }
        }
    });

    const onSubmit = (data: IFormInput) => {
        const formattedData = {
            ...data,
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : null,
        };
        mutation.mutate(formattedData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 text-sm font-medium">First Name</label>
                            <input
                                {...register("first_name")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            />
                            {errors.first_name && (
                                <p className="text-sm text-red-500">{errors.first_name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Last Name</label>
                            <input
                                {...register("last_name")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            />
                            {errors.last_name && (
                                <p className="text-sm text-red-500">{errors.last_name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                {...register("confirmPassword")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Phone</label>
                            <input
                                type="text"
                                {...register("phone")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Date of Birth</label>
                            <input
                                type="date"
                                {...register("dob")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            />
                            {errors.dob && (
                                <p className="text-sm text-red-500">{errors.dob.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Gender</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="m"
                                        {...register("gender")}
                                        className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm font-medium">Male</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="f"
                                        {...register("gender")}
                                        className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm font-medium">Female</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="o"
                                        {...register("gender")}
                                        className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    />
                                    <span className="text-sm font-medium">Other</span>
                                </label>
                            </div>
                            {errors.gender && (
                                <p className="text-sm text-red-500">{errors.gender.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Address</label>
                            <input
                                {...register("address")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            />
                            {errors.address && (
                                <p className="text-sm text-red-500">{errors.address.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Role</label>
                            <select
                                {...register("role")}
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                            >
                                <option value="super_admin">Super Admin</option>
                                <option value="artist_manager">Artist Manager</option>
                                <option value="artist">Artist</option>
                            </select>
                            {errors.role && (
                                <p className="text-sm text-red-500">{errors.role.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="p-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:ring focus:ring-indigo-200"
                            disabled={mutation.isLoading}
                        >
                            {mutation.isLoading ? 'Submitting' : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;