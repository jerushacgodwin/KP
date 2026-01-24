import { useUser } from "@src/app/context/UserContext";
import { useLoader } from "@src/app/context/LoaderContext";
import { role } from "@src/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = ({menulist,userDetail}: {menulist: any, userDetail: any}) => {
  //console.log(menulist);
 const userFromHook = useUser();

 const user = userDetail || userFromHook;

  const menu=menulist
 // console.log("Menu component rendered with role:", menulist);
  if (!menu&&!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading menu...</p>
      </div>
    );
  }
    const handleClick = (e: any) => {
    //e.preventDefault();
    //setLoading(true);
    //navigate(item.slug);
  };

  if (menu.length&&user.role) {
  return (
    <>
   
      <div className="mt-4 text-sm">

        <div className="flex flex-col gap-2">
          <span className="hidden lg:block text-gray-400 font-light my-4">
         Menu
          </span>
            
          {menu.map((item:any,index: number) => {
            if (item.group_id==user?.role) {
              return (
                <div key={item.name}>
                   {index === 0 && (
          <Link
            href={`/${item.group}`}
            className="flex items-center justify-center lg:justify-start gap-4 text-blue-500 py-2 md:px-2 rounded-md hover:bg-blue-100 font-semibold"
          >
            <Image src="/home.png" alt="Dashboard" width={20} height={20} />
            <span className="hidden lg:block">Home</span>
          </Link>
        )}
                <Link
                  href={item.slug}
                  key={item.name}
                  onClick={handleClick}
                  className="flex cursor-pointer items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={`/${item.icon.toLowerCase()}.png`} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.name.replace('List ','')}</span>
                </Link>
                </div>
              );
            }
          })}
        </div>
    
    </div>
    </>
  );
}
};

export default Menu;
