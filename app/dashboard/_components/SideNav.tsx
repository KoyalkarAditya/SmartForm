"use client";
import { GetAllUserForms } from "@/app/actions/GetAllUserForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Form } from "./FromList";

export const SideNav = () => {
  const path = usePathname();
  const [formList, setFormList] = useState<Form[]>([]);
  const user = useSession();
  useEffect(() => {
    if (user.data) fetchUserForms();
  }, [user]);
  const fetchUserForms = async () => {
    const forms = await GetAllUserForms(user.data?.user?.email as string);
    setFormList(forms ? forms : []);
  };

  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 1,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  return (
    <div className="h-screen shadow-md border">
      <div className="p-4">
        {menuList.map((menu, index) => (
          <Link
            href={`${menu.path}`}
            key={index}
            className={`flex items-center  gap-5 mb-5 hover:bg-primary cursor-pointer hover:text-white rounded-lg p-3 transition-all border ${
              path === menu.path && "bg-primary text-white"
            }`}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>
        <div className="my-7">
          <Progress
            value={33 * formList.length < 100 ? 33 * formList.length : 100}
          />
          <div className="text-sm mt-2 text-gray-600">
            <b> {formList.length} out of 3</b> File Created
          </div>
          <div className="text-sm mt-2 text-gray-600">
            Upgrade your plan for unlimited AI forms
          </div>
        </div>
      </div>
    </div>
  );
};
