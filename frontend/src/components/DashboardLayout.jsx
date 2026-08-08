import Sidebar from "./Sidebar";

import DashboardHeader from "./DashboardHeader";


export default function DashboardLayout({

  children

}) {

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <DashboardHeader />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>
  );
}