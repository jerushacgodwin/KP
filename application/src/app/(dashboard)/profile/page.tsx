"use client";
import { apiFetch } from "@src/lib/api";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const userString = Cookies.get("log-user");

interface UserProfile {
  photo?: string;
  name?: string;
  user_id?: string;
  phone_no?: string;
  class_id?: string;
  address?: string;
  gender?: string;
  religion?: string;
  blood_group?: string;
  dob?: string;
  father_name?: string;
  mother_name?: string;
  father_phone?: string;
  mother_phone?: string;
  present_address?: string;
  qualification?: string;
  guardian?: string;
  guardian_phone_no?: string;
}

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const fetchData = async () => {
    try {
      let user = null;
      if (userString) {
        user = JSON.parse(userString);
      }

      const response: any = await apiFetch(`${apiUrl}/user/profile`, "POST", user);
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

  return (
    <div className="rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className=" items-center justify-between">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg  p-6 flex flex-col items-center text-left">
            <img
              src={userProfile?.photo || "/Profile.png"}
              alt="Profile"
              className="w-[20rem] h-[20rem] rounded-full border-4 border-white  mb-4"
            />
            <h3 className="text-lg font-semibold">{userProfile?.name}</h3>
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Student ID:</span>{" "}
                {userProfile?.user_id}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {userProfile?.phone_no}
              </p>
              {userProfile?.class_id && (
                <p>
                  <span className="font-semibold">Class:</span>{" "}
                  {userProfile.class_id}
                </p>
              )}
            </div>
          </div>

          {/* General Info */}
          <div className="bg-white rounded-lg  p-6 md:col-span-2">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="inline-block">&#x1F4CB;</span> General
              Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-8">
              <div className="flex">
                <div className="font-semibold w-32">Address</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.address}</div>
              </div>

              <div className="flex">
                <div className="font-semibold w-32">Gender</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.gender}</div>
              </div>
              <div className="flex">
                <div className="font-semibold w-32">Religion</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.religion}</div>
              </div>
              <div className="flex">
                <div className="font-semibold w-32">Blood</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.blood_group}</div>
              </div>
              <div className="flex">
                <div className="font-semibold w-32">Date of Birth</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.dob}</div>
              </div>
            </div>
         
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="inline-block">&#x1F4DD;</span> Other Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex">
              <div className="font-semibold w-32">Father's Name</div>
              <div className="mx-2">:</div>
              <div>{userProfile?.father_name}</div>
            </div>
            <div className="flex">
              <div className="font-semibold">Mother's Name</div>
              <div className="mx-2">:</div>
              <div>{userProfile?.mother_name}</div>
            </div>

            <div className="flex">
              <div className="font-semibold ">Father's PhoneNumber</div>
              <div className="mx-2">:</div>
              <div>{userProfile?.father_phone}</div>
            </div>
            <div className="flex">
              <div className="font-semibold ">Mother's PhoneNumber</div>
              <div className="mx-2">:</div>
              <div>{userProfile?.mother_phone}</div>
            </div>
            {userProfile?.present_address && (
              <div className="flex">
                <div className="font-semibold ">Present Address</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.present_address}</div>
              </div>
            )}
            {userProfile?.qualification && (
              <div className="flex">
                <div className="font-semibold ">Qualification</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.qualification}</div>
              </div>
            )}
            {userProfile?.guardian && (
              <div className="flex">
                <div className="font-semibold ">Guardian</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.guardian}</div>
              </div>
            )}
            {userProfile?.guardian_phone_no && (
              <div className="flex">
                <div className="font-semibold ">Guardian Phone No</div>
                <div className="mx-2">:</div>
                <div>{userProfile?.guardian_phone_no}</div>
              </div>
            )}
       
        </div>
          </div>
          
        </div>
       
      </div>
      {/* LIST */}
    </div>
  );
};

export default ProfilePage;
