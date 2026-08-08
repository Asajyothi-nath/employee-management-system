import Header from "./Header";

import Footer from "./Footer";


export default function Layout({

  children

}) {

  return (

    <div className="min-h-screen flex flex-col">

      <Header />

      {/* BODY */}
      <main className="flex-1 p-6 bg-gray-100">

        {children}

      </main>

      <Footer />

    </div>
  );
}