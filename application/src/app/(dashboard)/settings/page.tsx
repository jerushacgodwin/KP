"use client";
import { apiFetch } from "@src/lib/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@src/components/InputField";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from "@src/components/TextArea";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userString = Cookies.get("log-user");
const AddSchoolSchema = z.object({
  img: z.preprocess(
    (val) => (val instanceof FileList ? val[0] : val),
    z.custom<File>((file) => file instanceof File && file.size > 0, {
      message: "Image is required!",
    })
  ),
  schoolName: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Present address is required"),
});
const addClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  group: z.string().min(1, "Group name is required"),
 
});
const addRoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
});
type Inputs = z.infer<typeof AddSchoolSchema>;
type AddClassInputs = z.infer<typeof addClassSchema>;
type AddRoleInputs = z.infer<typeof addRoleSchema>;
const ProfilePage = () => {
  const {
    register: AddSchoolRegister,
    handleSubmit: handleAddSchoolSubmit,
    setValue,
    formState: { errors: SchoolErrors },
  } = useForm<Inputs>({
    resolver: zodResolver(AddSchoolSchema),
  });
  const {
    register: classRegister,
    handleSubmit: handleClassSubmit,
    formState: { errors: classErrors },
  } = useForm<AddClassInputs>({
    resolver: zodResolver(addClassSchema),
  });
    const {
    register: roleRegister,
    handleSubmit: handleRoleSubmit,
    formState: { errors: roleErrors },
  } = useForm<AddRoleInputs>({
    resolver: zodResolver(addRoleSchema),
  });
  const [userProfile, setUserProfile] = useState();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState(null);
  type UserProfileResponse = {
    user?: any;
    [key: string]: any;
  };

  const fetchData = async () => {
    try {
      let user = null;
      if (userString) {
        user = JSON.parse(userString);
      }

      const response: UserProfileResponse = await apiFetch(`${apiUrl}/user/profile`, "POST", user);
      // Handle the response data as needed
      if (response && response.user) {
        setUserProfile(response.user);
      }
      //
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const onSchoolSubmit = async (data: Inputs) => {
     const response = await apiFetch(`${apiUrl}/user/school`, "POST", data,{},true);

    //
  };
  const onClassSubmit = async (data: AddClassInputs) => {
     const response = await apiFetch(`${apiUrl}/class/addClass`, "POST", data);

    //
  };


  const onRoleSubmit = async (data: AddRoleInputs) => {
      const response = await apiFetch(`${apiUrl}/class/addRole`, "POST", data);

    //
  };
 const onAddClassTeacherSubmit = async (data: AddRoleInputs) => {
      const response = await apiFetch(`${apiUrl}/class/addClassTeacher`, "POST", data);
 }

  return (
    <div className="rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className=" items-center justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg  p-6 flex flex-col text-left">
            <form
              onSubmit={handleAddSchoolSubmit(onSchoolSubmit, (errors) => {
                console.error("❌ Form validation errors:", errors);
              })}
            >
              <Image
                src={previewUrl || "/school.png"}
                alt="Profile"
                width={200}
                height={200}
                className="w-[20rem] h-[20rem]  border-4 border-white  mb-4"
              />

              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <div className=" mb-4">
                  <label
                    className="text-xs text-gray-500 flex gap-2 cursor-pointer"
                    htmlFor="img"
                  >
                    <Image src="/upload.png" alt="" width={28} height={28} />
                    <span>Upload Logo</span>
                  </label>
                  <input
                    type="file"
                    id="img"
                    accept="image/*"
                    {...AddSchoolRegister("img")}
                    className="hidden"
                       onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("img", file, { shouldValidate: true });
      setPreviewUrl(URL.createObjectURL(file)); // set image preview
    }
  }}
                  />
                  {SchoolErrors.img?.message && (
                    <p className="text-xs text-red-400">
                      {SchoolErrors.img.message.toString()}
                    </p>
                  )}
                </div>

                <InputField
                  label="School Name"
                  name="schoolName"
                  register={AddSchoolRegister}
                  error={SchoolErrors.schoolName}
                  className="pb-2"
                />
                <TextArea
                  label="School Address"
                  name="address"
                  register={AddSchoolRegister}
                  error={SchoolErrors?.address}
                />
              </div>
              <button
                className="bg-blue-400 text-white p-2 mt-4 rounded-md"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>

          {/* General Info */}
          <div className="bg-white rounded-lg  p-6 ">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
           Add Class
            </h4>
            <form
              onSubmit={handleClassSubmit(onClassSubmit, (errors) => {
                console.error("❌ Form validation errors:", errors);
              })}
            >
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                      
                <InputField
                  label="Class Name"
                  name="name"
                  register={classRegister}
                  error={classErrors.name}
                  className="pb-2"
                />
                <InputField
                  label="Class Group"
                  name="group"
                  register={classRegister}
                  error={classErrors.group}
                  className="pb-2"
                />      
              </div>
              <button
                className="bg-blue-400 text-white p-2 mt-4 rounded-md"
                type="submit"
              >
                Save
              </button>
            </form>
            <h4 className="text-lg font-semibold mt-4 mb-3 flex items-center gap-2">
             Add Role
             </h4>
            <div className="grid  gap-4 text-sm text-gray-700">
              <form
              onSubmit={handleRoleSubmit(onRoleSubmit, (errors) => {
                console.error("❌ Form validation errors:", errors);
              })}
            >
                <InputField
                  label="Role Name"
                  name="name"
                  register={roleRegister}
                  error={roleErrors.name}
                  className="pb-2"
                />
            
              <button
                className="bg-blue-400 text-white p-2 mt-4 rounded-md"
                type="submit"
              >
                Save
              </button>
            </form>
          
            </div>
              <h4 className="text-lg font-semibold mt-4 mb-3 flex items-center gap-2">
             Add Class Teacher
             </h4>
            <div className="grid  gap-4 text-sm text-gray-700">
              <form
              onSubmit={handleRoleSubmit(onAddClassTeacherSubmit, (errors) => {
                console.error("❌ Form validation errors:", errors);
              })}
            >
                <InputField
                  label="Role Name"
                  name="name"
                  register={roleRegister}
                  error={roleErrors.name}
                  className="pb-2"
                />
            
              <button
                className="bg-blue-400 text-white p-2 mt-4 rounded-md"
                type="submit"
              >
                Save
              </button>
            </form>
          
            </div>
          </div>
        </div>
      </div>
      {/* LIST */}
    </div>
  );
};

export default ProfilePage;
