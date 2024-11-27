"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateUserTypes, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "../LoadingButton";
import Image from "next/image";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useState } from "react";
import { GeneralLink } from "../groups/group-nav";
import { updatePassword, useUpdateUserAccount } from "@/api/auth";
import { CheckCircle, XCircleIcon, XIcon } from "lucide-react";

const formSchema = z.object({
  _id: z.string(),
  title: z.enum(["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."]),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  religion: z.string(),
  place_of_birth: z.string(),
  current_parish: z.string(),
  birthday: z.string().min(10, "Birthday is required"),
  national_id_number: z.string(),
  national_id_photo: z.string().optional(),
  phone: z.string().min(10, "Phone number is required"),
  home_address: z.string(),
  home_location_map: z.string(),
  district_of_birth: z.string(),
  parish_of_birth: z.string(),
  village_of_birth: z.string(),
  marital_status: z.enum(["Single", "Married", "Divorced", "Widowed"]),
  occupation: z.string(),
  job_title: z.string(),
  next_of_kin: z.object({
    national_id_link: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  monthly_income_level: z.enum([
    "Less than UGX 1,000,000",
    "UGX 1,000,000 - 5,000,000",
    "UGX 5,000,000 - 15,000,000",
    "Above UGX 15,000,000",
  ]),
  bank_name: z.string(),
  bank_account_number: z.string(),
  bank_mobile_account: z.string(),
  bank_email: z.string(),
  highest_education_level: z.enum([
    "Secondary (Ordinary Level)",
    "Secondary (Advanced Level)",
    "Tertiary",
    "University",
    "Other (Specify)",
  ]),
  employment_status: z.enum([
    "Employed",
    "Self-employed",
    "Unemployed",
    "Retired",
  ]),
  current_work_address: z.string(),
  employer_name: z.string(),
  current_salary: z.string(),
  side_hustle_income: z.string(),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (UserProfileData: UserFormData) => void;
  isLoading: boolean;
};

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateAccount } = useUpdateUserAccount();
  // State to hold the answers to the security questions
  const [securityQuestions, setSecurityQuestions] = useState<
    { question: string; answer: string }[]
  >(currentUser.securityQuestions);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    oldPassword: "",
  });

  const handlePasswordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setup2FA = async () => {
    const accessToken = Cookies.get("access-token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/2fa/setup`,
        {
          method: "GET",
          headers: {
            "Content-Type": "applications",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setQrCodeUrl(data.qrCodeUrl);
    } catch (error) {
      console.error("Error setting up 2FA:", error);
    }
  };

  const verify2FA = async () => {
    const accessToken = Cookies.get("access-token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/api/2fa/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ token }),
        }
      );
      const data = await response.json();
      if (data.message === "2FA verification successful!") {
        setIsVerified(true);
        alert("2FA setup complete!");
      } else {
        alert("Invalid 2FA token. Try again.");
      }
    } catch (error) {
      console.error("Error verifying 2FA:", error);
    }
  };

  // Handle input change
  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setSecurityQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].answer = value; // Update the answer for the correct question
      return updatedQuestions;
    });
  };

  const handleUpdateSecurityQuestion = async () => {
    try {
      setIsUpdating(true);
      const res = await updateAccount({ securityQuestions });
    } catch (err: any) {
      toast.error("Something went wrong. Please try again");
      console.log(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file !== undefined) setFile(file as File);
    setImagePreview(URL.createObjectURL(file as File));
  };

  const uploadPicture = async () => {
    try {
      if (file) {
        setUploading(true);
        const accessToken = Cookies.get("access-token");
        const formData = new FormData();
        formData.append("profile_pic", file);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/user/upload-profile-picture`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        );

        let result = await res.json();
        if (!result.status) throw new Error();
        toast.success("Profile Picture updated successfully");
        window.location.reload();
      } else {
        toast.error("please upload a file");
      }
    } catch (error) {
      toast.error("Error occurred. Please refresh the page");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className="space-y-2 bg-gray-950 text-white rounded-lg md:p-10 w-full grid md:grid-cols-3 grid-cols-1 gap-5"
        >
          <FormDescription className="flex flex-col">
            View and change{" "}
            <strong>
              {currentUser?.firstName} {currentUser?.lastName}&apos;s profile
            </strong>{" "}
            profile information here
            <span className="flex w-full items-center justify-between p-2 border rounded-md mt-3">
              Profile Complete
              {currentUser?.is_complete ? (
                <CheckCircle color="green" />
              ) : (
                <XCircleIcon color="red" />
              )}
            </span>
          </FormDescription>
          <div className="flex flex-col-reverse justify-center text-center items-start">
            <FormItem className="w-full flex justify-start">
              <div className="flex items-center gap-2">
                <Button
                  className="disabled:cursor-not-allowed"
                  type="button"
                  disabled={uploading}
                >
                  <FormLabel className="p-2 border-2 mt-3 cursor-pointer bg-[#FDB347] hover:bg-[#E69F35] text-black rounded-lg">
                    {" "}
                    Choose Profile Picture
                  </FormLabel>
                </Button>
                {imagePreview && (
                  <Button
                    type="button"
                    className="border disabled:cursor-not-allowed border-black"
                    disabled={uploading}
                    onClick={uploadPicture}
                  >
                    Upload
                  </Button>
                )}
              </div>
              <FormControl>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-white p-2 border border-gray-300 rounded-lg"
                  hidden
                  name="profile_pic"
                />
              </FormControl>
            </FormItem>
            {
              <div className="w-[100px] h-[100px] rounded-full">
                <div className="border border-gray-300 p-2 w-full rounded-full h-full">
                  <img
                    src={imagePreview || currentUser.profile_pic}
                    alt=""
                    className="object-cover w-full rounded-full h-full"
                  />
                </div>
              </div>
            }
          </div>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(e) =>
                      form.setValue("title", e as UserFormData["title"])
                    }
                  >
                    <SelectTrigger className="bg-white w-full">
                      <SelectValue placeholder="Select Title" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem className="cursor-pointer" value="Mr.">
                        Mr.
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Ms.">
                        Ms.
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Mrs.">
                        Mrs.
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Dr.">
                        Dr.
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Prof.">
                        Prof.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Full Name */}
          <div className="flex flex-wrap w-full justify-between gap-3">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(e) =>
                      form.setValue("gender", e as UserFormData["gender"])
                    }
                  >
                    <SelectTrigger className="bg-white w-full">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem className="cursor-pointer" value="Male">
                        Male
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Female">
                        Female
                      </SelectItem>
                      <SelectItem className="cursor-pointer" value="Other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Contact Information */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className=" text-black bg-[#FDB347] hover:bg-[#E69F35]"
          >
            {isLoading ? <LoadingButton /> : "Save Changes"}
          </Button>
        </form>
      </Form>

      <div className="w-full py-2 px-8 text-white">
        <h1 className="font-extrabold text-[1.2rem]">Other Settings</h1>

        <div className="w-full flex flex-col gap-4 mt-5">
          {/* change password */}
          <div className="flex flex-col gap-3">
            <h1>Update password</h1>
            <div className="flex gap-2 items-center">
              <Input
                value={passwords.oldPassword}
                onChange={handlePasswordsChange}
                name="oldPassword"
                placeholder="Old password"
              />
              <Input
                value={passwords.newPassword}
                onChange={handlePasswordsChange}
                name="newPassword"
                placeholder="New password"
              />
              <Button
                onClick={() => updatePassword(passwords)}
                className="bg-orange-500 text-white font-bold"
              >
                Update
              </Button>
            </div>
          </div>
          {/* Subscribe to Notifications */}
          <div className="flex w-full justify-between items-center">
            <h1>Subscribe to Notifications</h1>
            <div>
              <Button className="bg-orange-500 text-white font-bold">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Security Features */}
          <div className="w-full">
            <h1 className="font-extrabold text-[1.2rem]">Security Features</h1>
            <div className="flex flex-col gap-2">
              {/* Two-factor Authentication */}
              <div className="flex w-full justify-between items-center">
                <h1>Enable Two-Factor Authentication</h1>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      className="bg-green-500 text-white font-bold"
                      onClick={setup2FA}
                    >
                      Set up 2FA
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader className="font-bold text-[1.2rem]">
                      Set up 2FA for improved security
                    </DialogHeader>

                    {qrCodeUrl && (
                      <div className="flex flex-col gap-4">
                        <h2 className="font-semibold">
                          Scan this QR code with your Authenticator App:
                        </h2>
                        <img
                          src={qrCodeUrl}
                          alt="QR Code"
                          className="w-32 h-32 mx-auto"
                        />

                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="Enter the token from the app"
                          value={token}
                          onChange={(e) => setToken(e.target.value)}
                        />

                        <Button
                          className="bg-blue-500 text-white font-bold"
                          onClick={verify2FA}
                        >
                          Verify Token
                        </Button>

                        {isVerified && (
                          <p className="text-green-500">
                            2FA is successfully enabled!
                          </p>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              {/* Security Questions */}
              <div className="flex w-full justify-between items-center">
                <h1>Set Security Questions</h1>
                <Dialog>
                  <DialogTrigger>
                    <Button className="bg-green-500 text-white font-bold">
                      Set Questions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader className="font-bold text-[1.2rem]">
                      Answer these questions for account recovery
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      {securityQuestions.map((questionObj, index) => (
                        <div className="flex flex-col gap-3" key={index}>
                          <label className="font-bold">
                            Question {index + 1}:
                          </label>
                          <p>{questionObj.question}</p>
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder={`Answer question ${index + 1}`}
                            value={questionObj.answer}
                            onChange={(e) => handleInputChange(index, e)} // Handle input change for this question
                          />
                        </div>
                      ))}

                      <div className="flex justify-end">
                        <Button
                          className="bg-blue-500 text-white font-bold"
                          disabled={isUpdating}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            handleUpdateSecurityQuestion();
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Consent and Agreements */}
          <div className="w-full">
            <h1 className="font-extrabold text-[1.2rem]">
              Consent and Agreements
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms">
                  I agree to the Terms and Conditions
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="privacy" className="mr-2" />
                <label htmlFor="privacy">I agree to the Privacy Policy</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="data-sharing" className="mr-2" />
                <label htmlFor="data-sharing">
                  I agree to Data Sharing Agreements
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileForm;
