"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import TextArea from "../TextArea";
import { useEffect, useRef, useState } from "react";
import DropDownField from "../DropDown";
import { apiFetch } from "@src/lib/api";
import { sanitizeFormData } from "@src/lib/utility";

const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required!" }),
    lastName: z.string().min(1, { message: "Last name is required!" }),
    telePhone: z.string().optional().nullable(),
    address: z.string().min(1, { message: "Address is required!" }),
    bloodType: z.string().min(1, { message: "Blood Type is required!" }),
    birthday:  z.preprocess((val) => {
  if (typeof val === "string") {
    const parsed = new Date(val);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }

  if (val instanceof Date) {
    return isNaN(val.getTime()) ? undefined : val;
  }

  return undefined;
},  z.date({ required_error: "Birthday is required!" })),
    sex: z.enum(["male", "female"], { message: "Sex is required!" }),
    designation: z.string().optional().nullable(),
    qualification: z.string().optional().nullable(),
    email: z.string().email().optional().nullable(),
    phone_no: z.string().optional().nullable(),
    joining_date: z.preprocess((val) => {
  if (typeof val === "string") {
    const parsed = new Date(val);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }

  if (val instanceof Date) {
    return isNaN(val.getTime()) ? undefined : val;
  }

  return undefined;
}, z.date({ required_error: "Joining date is required!" })),
    experience: z.string().optional().nullable(),
    role_id: z.number().optional().nullable(),
    img: z.preprocess(
      (val) => (val instanceof FileList ? val[0] : val),
      z.custom<File>((file) => file instanceof File && file.size > 0, {
        message: "Image is required!",
      })
    ),
    fatherName: z.string().min(1, { message: "Father's name is required!" }),
    motherName: z.string().min(1, { message: "Mother's name is required!" }),
    fatherPhone: z.string().optional(),
    motherPhone: z.string().optional(),
    marital_status: z.enum(["single", "married", "divorced", "widowed"],{ message: "Marital status is required!" }),
    husband_WifeName: z
      .string()

      .optional(),
    husband_WifePhone: z.string().optional(),
    specialized_in: z.string().optional(),
    age: z.preprocess(
      (val) => (val ? Number(val) : undefined),
      z
        .number({ invalid_type_error: "Age must be a number" })
        .min(1, { message: "Age must be at least 1!" })
    ),
    nationality: z
      .string()
      .min(1, { message: "Nationality is required!" })
      .default("Indian"),
    presentAddress: z
      .string()
      .min(1, { message: "Present address is required!" }),
 
    idproof: z.preprocess(
      (val) => (val instanceof FileList ? val[0] : val),
      z.custom<File>((file) => file instanceof File && file.size > 0, {
        message: "Image is required!",
      })
    ),
    resume: z.preprocess(
      (val) => (val instanceof FileList ? val[0] : val),
      z.custom<File>((file) => file instanceof File && file.size > 0, {
        message: "Image is required!",
      })
    ),
    religion: z.enum(["hinduism", "islam", "christianity", "sikhism", "buddhism", "jainism", "other"], { message: "Religion is required!" }),
    cast: z.enum(["general", "obc", "sc", "st", "sbc", "other"], { message: "Caste is required!" }),
  })
  .superRefine((data, ctx) => {
    if (
      data.marital_status === "married" &&
      (!data.husband_WifeName || data.husband_WifeName.trim() === "")
    ) {
      ctx.addIssue({
        path: ["husband_WifeName"],
        code: z.ZodIssueCode.custom,
        message: "Spouse name is required when marital status is Married",
      });
    }
  });

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [sexSelected, setSexSelected] = useState<any[]>([]);
  const [getAllClassList, setAllClassList] = useState<any[]>([]);
  const [getAllRolsList, setAllRolsList] = useState<any[]>([]);
  const [getSelectedRole, setSelectedRole] = useState<any[]>([]);
  const [getMaritalStatus, setMaritalStatus] = useState<any[]>([]);
  const [getselectedReligion, setSelectedReligion] = useState<any[]>([]);
  const [getselectedCast, setSelectedCast] = useState<any[]>([]);
  const staffFormRef = useRef<HTMLFormElement>(null);
  const onSubmit = (data: Inputs) => {
    const cleaned = sanitizeFormData(data);
        const addstaff=  apiFetch(`${apiUrl}/teacher/addstaff`, 'POST',cleaned,{},true);
      // console.log("Form valid, submitting:", addstaff);
      staffFormRef.current?.reset();  
      setValue("img", undefined);
      setValue("idproof", undefined);
      setValue("resume", undefined);
      
        
    //console.log(data);
  };
  const sexOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const marital_Status = [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Divorced", value: "divorced" },
    { label: "Widowed", value: "widowed" },
  ];
  const religion = [
    { label: "Hinduism", value: "hinduism" },
    { label: "Islam", value: "islam" },
    { label: "Christianity", value: "christianity" },
    { label: "Sikhism", value: "sikhism" },
    { label: "Buddhism", value: "buddhism" },
    { label: "Jainism", value: "jainism" },
    { label: "Other", value: "other" },
  ];
  const caste = [
    { label: "General", value: "general" },
    { label: "OBC", value: "obc" },
    { label: "SC", value: "sc" },
    { label: "ST", value: "st" },
    { label: "SBC", value: "sbc" },
    { label: "Other", value: "other" },
  ];
  const setSelectedSex = (value: { selected: any }) => {
    setSexSelected(value.selected);
  };
  const setReligion = (value: { selected: any }) => {
    setSelectedReligion(value.selected);
  };
  useEffect(() => {
    async function getClassList() {
      const [getClasslist, getAllRols] = await Promise.all([
        apiFetch(`${apiUrl}/class`, "GET"),
        apiFetch(`${apiUrl}/teacher/role`, "GET"),
      ]);
      if (getClasslist && getClasslist.result) {
        setAllClassList(getClasslist.result);
      }
      if (getAllRols && getAllRols.result) {
        setAllRolsList(getAllRols.result);
      }
    }
    getClassList();
  }, []);
  const selectedRole = (value: { selected: any }) => {
    const selectedRole = getAllRolsList.find((role) => role.name === value.selected);
    if (selectedRole) {
      setValue('role_id', selectedRole.id);
    }
    setSelectedRole(value.selected);
  };
  const setSelectedmarital = (value: { selected: any }) => {
    setMaritalStatus(value.selected);
  };
  const setCast = (value: { selected: any }) => {
    setSelectedCast(value.selected);
  };
  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.error("❌ Form validation errors:", errors);
      })}
      ref={staffFormRef}
    >
      <h1 className="text-xl font-semibold">Create a new Staff</h1>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
          className="pb-2"
        />
        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
          className="pb-2"
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
          className="pb-2"
        />
        <InputField
          label=""
          name="role_id"
          defaultValue={data?.role_id}
          register={register}
          error={errors.role_id}
          className="pb-2 hidden"
        />
        <InputField
          label="Phone"
          name="phone_no"
          defaultValue={data?.phone_no}
          register={register}
          error={errors.phone_no}
          className="pb-2"
        />
        <InputField
          label="Qualification"
          name="qualification"
          defaultValue={data?.qualification}
          register={register}
          error={errors.qualification}
          className="pb-2"
        />
        <InputField
          label="Age"
          name="age"
          type="number"
          defaultValue={data?.age}
          register={register}
          error={errors.age}
          className="pb-2"
        />

        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={data?.birthday}
          register={register}
          error={errors.birthday}
          type="date"
          className="pb-2"
        />
        {/* <div className="flex flex-col gap-2 w-full md:w-1/4"> */}
        {/* <label className="text-xs text-gray-500">Sex</label> */}
        {/* <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select> */}
        <DropDownField
          label="Sex"
          value={sexSelected}
          name="sex"
          options={sexOptions}
          control={control}
          setSelected={setSelectedSex}
          optionLabel="label"
          optionValue="value"
        />

        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
          className="pb-2"
        />
        <InputField
          label="Nationality"
          name="nationality"
          defaultValue={data?.nationality || "Indian"}
          register={register}
          error={errors?.nationality}
          className="pb-2"
        />
        <DropDownField
          label="Marital Status"
          value={getMaritalStatus}
          name="marital_status"
          options={marital_Status}
          control={control}
          setSelected={setSelectedmarital}
          optionLabel="label"
          optionValue="value"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Specialized In"
          name="specialized_in"
          defaultValue={data?.specialized_in}
          register={register}
          error={errors?.specialized_in}
          className="pb-2"
        />
        <InputField
          label="Experience"
          name="experience"
          defaultValue={data?.experience}
          register={register}
          error={errors?.experience}
          className="pb-2"
        />
        <div className="flex flex-col gap-2 w-full  justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="birthcet"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload ID Proof</span>
          </label>
          <input
            type="file"
            id="birthcet"
            {...register("idproof")}
            className="hidden"
          />
          {errors.idproof?.message && (
            <p className="text-xs text-red-400">
              {errors.idproof.message.toString()}
            </p>
          )}
        </div>
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Joining Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {getAllRolsList && (
          <DropDownField
            label="Designation"
            value={getSelectedRole}
            name="designation"
            options={getAllRolsList}
            control={control}
            setSelected={selectedRole}
            optionLabel="name"
            optionValue="name"
          />
        )}
        <InputField
          label="Joining Date"
          name="joining_date"
          defaultValue={data?.joining_date}
          register={register}
          error={errors.joining_date}
          type="date"
          className="pb-2"
        />
        <div className="flex flex-col gap-2 w-full  justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="resume"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload Resume</span>
          </label>
          <input
            type="file"
            id="resume"
            {...register("resume")}
            className="hidden"
          />
          {errors.idproof?.message && (
            <p className="text-xs text-red-400">
              {errors.idproof.message.toString()}
            </p>
          )}
        </div>
      </div>
      {/* {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )} */}
      {/* </div> */}

      <span className="text-xs text-gray-400 font-medium">
        Parent Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Father's Name"
          name="fatherName"
          type="text"
          defaultValue={data?.fatherName}
          register={register}
          error={errors.fatherName}
          className="pb-2"
        />
        <InputField
          label="Mother's Name"
          name="motherName"
          defaultValue={data?.motherName}
          register={register}
          error={errors.motherName}
          className="pb-2"
        />
        <InputField
          label="Father's Phone"
          name="fatherPhone"
          defaultValue={data?.fatherPhone}
          register={register}
          error={errors?.fatherPhone}
          className="pb-2"
        />
        <InputField
          label="Mother's Phone"
          name="motherPhone"
          defaultValue={data?.motherPhone}
          register={register}
          error={errors?.motherPhone}
          className="pb-2"
        />

        <InputField
          label="Husband/Wife Name"
          name="husband_WifeName"
          defaultValue={data?.husband_WifeName}
          register={register}
          error={errors?.husband_WifeName}
          className="pb-2"
        />

        <InputField
          label="Husband/Wife Phone"
          name="husband_WifePhone"
          defaultValue={data?.husband_WifePhone}
          register={register}
          error={errors?.husband_WifePhone}
          className="pb-2"
        />

        <InputField
          label="TelePhone"
          name="telePhone"
          defaultValue={data?.telePhone}
          register={register}
          error={errors?.telePhone}
          className="pb-2"
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Address Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextArea
          label="Present Address"
          name="presentAddress"
          register={register}
          error={errors?.address}
        />
        <TextArea
          label="Permanent Address"
          name="address"
          register={register}
          error={errors?.address}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Other Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DropDownField
          label="Religion"
          value={getselectedReligion}
          name="religion"
          options={religion}
          control={control}
          setSelected={setReligion}
          optionLabel="label"
          optionValue="value"
        />
        <DropDownField
          label="Caste"
          value={getselectedCast}
          name="cast"
          options={caste}
          control={control}
          setSelected={setCast}
          optionLabel="label"
          optionValue="value"
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit"  disabled={isSubmitting}>
        {isSubmitting
    ? "Processing..."
    : type === "create"
    ? "Create"
    : "Update"}

      </button>
    </form>
  );
};

export default TeacherForm;

