"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiFetch } from "@src/lib/api";
import DropDownField from "../DropDown";
import TextArea from "../TextArea";
import { sanitizeFormData } from "@src/lib/utility";

const schema = z.object({
 
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  age: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z
      .number({ invalid_type_error: "Age must be a number" })
      .min(1, { message: "Age must be at least 1!" })
  ),
  telePhone: z.string().min(1, { message: "Phone is required!" }),
 
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.preprocess((val) => {
  if (typeof val === "string") {
    const parsed = new Date(val);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }

  if (val instanceof Date) {
    return isNaN(val.getTime()) ? undefined : val;
  }

  return undefined;
}, z.date({ required_error: "Birthday is required!" })),
  sex: z.enum(["male", "female"], {
    required_error: "Sex is required!",
    invalid_type_error: "Invalid value for sex",
  }),
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
  fatherEmail: z
    .string()
    
    .optional(),
  motherEmail: z.string().optional(),
  fatherOccuPation: z
    .string()
    .min(1, { message: "Father's occupation is required!" })
    .optional(),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required!" })
    .optional(),
  religion: z.enum(["hinduism", "islam", "christianity", "sikhism", "buddhism", "jainism", "other"], { message: "Religion is required!" }),
    cast: z.enum(["general", "obc", "sc", "st", "sbc", "other"], { message: "Caste is required!" }),
  nationality: z
    .string()
    .min(1, { message: "Nationality is required!" })
    .default("Indian"),
  presentAddress: z
    .string()
    .min(1, { message: "Present address is required!" }),
  permanentAddress: z
    .string()
    .min(1, { message: "Permanent address is required!" }),
  guardian: z
    .string()
   
    .optional(),
  guardianPhone: z
    .string()
   
    .optional(),
  guardianEmail: z
    .string()
   
    .optional(),
  note: z.string().optional(),
  class: z
    .number({ invalid_type_error: "Class is required!" })
    .min(1, { message: "Class is required!" }),
    birthcet:z.preprocess(
    (val) => (val instanceof FileList ? val[0] : val),
    z.custom<File>((file) => file instanceof File && file.size > 0, {
      message: "Image is required!",
    })
  ),
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [classList, setclassList] = useState<any[]>([]);
  const [dropDownSelected, setDropDownSelected] = useState<any[]>([]);
  const [sexSelected, setSexSelected] = useState<any[]>([]);
  const [getselectedReligion, setSelectedReligion] = useState<any[]>([]);
  const [getselectedCast, setSelectedCast] = useState<any[]>([]);

  useEffect(() => {
    async function getClassList() {
      const getclasslist: any = await apiFetch(`${apiUrl}/class`, "GET");
      if (getclasslist && getclasslist.result) {
        setclassList(getclasslist.result);
      }
    }
    getClassList();
  }, []);
  const onSubmit = (data: Inputs) => {
    const cleaned = sanitizeFormData(data);
    const addstudent=  apiFetch(`${apiUrl}/student/addstudent`, 'POST',cleaned,{},true);
  //console.log("Form valid, submitting:", addstudent);
    // e.g. send to server, clear form, etc.
  };
  const setSelectedClass = (value: { selected: any }) => {
    //console.log("Selected class:", value.selected);
    setDropDownSelected(value.selected);
  };
  const sexOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
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
    //console.log("Selected sex:", value.selected);
    setSexSelected(value.selected);
  };
    const setReligion = (value: { selected: any }) => {
    setSelectedReligion(value.selected);
  };
    const setCast = (value: { selected: any }) => {
    setSelectedCast(value.selected);
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit, (errors) => {
  console.error("❌ Form validation errors:", errors);
})}>
      <h1 className="text-xl font-semibold">Create a new student</h1>

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
        {classList && (
          <DropDownField
            label="Class"
            name="class"
            value={dropDownSelected}
            options={classList}
            control={control}
            setSelected={setSelectedClass}
            optionLabel="name"
            optionValue="class_id"
          />
        )}
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
        {/* {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )} */}
        {/* </div> */}
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
      </div>
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
          name="FatherPhone"
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
          label="Father's Email"
          name="fatherEmail"
          type="email"
          defaultValue={data?.fatherEmail}
          register={register}
          error={errors?.fatherEmail}
          className="pb-2"
        />
        <InputField
          label="Mother's Email"
          name="motherEmail"
          type="email"
          defaultValue={data?.motherEmail}
          register={register}
          error={errors?.motherEmail}
          className="pb-2"
        />
        <InputField
          label="Father's Occupation"
          name="fatherOccuPation"
          defaultValue={data?.fatherOccuPation}
          register={register}
          error={errors?.fatherOccuPation}
          className="pb-2"
        />
        <InputField
          label="Mother's Occupation"
          name="motherOccupation"
          defaultValue={data?.motherOccupation}
          register={register}
          error={errors?.motherOccupation}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Guardian's Name"
          name="guardian"
          defaultValue={data?.guardian}
          register={register}
          error={errors?.guardian}
          className="pb-2"
        />

        <InputField
          label="Guardian's Phone"
          name="guardianPhone"
          defaultValue={data?.guardianPhone}
          register={register}
          error={errors?.guardianPhone}
          className="pb-2"
        />
        <InputField
          label="Guardian's Email"
          name="guardianEmail"
          type="email"
          defaultValue={data?.guardianEmail}
          register={register}
          error={errors?.guardianEmail}
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
          error={errors?.presentAddress}
        />
        <TextArea
          label="Permanent Address"
          name="permanentAddress"
          register={register}
          error={errors?.permanentAddress}
        />
          <TextArea
          label="Note"
          name="note"
          register={register}
          error={errors?.note}
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
      
        <div className="flex flex-col gap-2 w-full  justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="birthcet"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload Birth Certificate</span>
          </label>
          <input type="file" id="birthcet" {...register("birthcet")} className="hidden" />
          {errors.birthcet?.message && (
            <p className="text-xs text-red-400">
              {errors.birthcet.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md" type="submit"disabled={isSubmitting}>
      {isSubmitting
    ? "Processing..."
    : type === "create"
    ? "Create"
    : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
