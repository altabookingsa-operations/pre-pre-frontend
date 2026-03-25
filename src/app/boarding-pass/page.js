// import RegistrationPage from "@/components/registrationPage";
// import RegistrationPageMobile from "@/components/registrationPageMobile";
// export default function Page() {
//   // server-controlled endpoint; can be env-driven if needed
//   return (
//     <main>
//       <RegistrationPage />
//     </main>
//   );
// }
import dynamic from "next/dynamic";
const RegistrationPage = dynamic(() => import("@/components/registrationPage"));
const RegistrationPageMobile = dynamic(() => import("@/components/registrationPageMobile"));

export default function Page() {
  return (
    <main>
      <div className="hidden xl:block">
        <RegistrationPage />
      </div>
      <div className="block xl:hidden">
        <RegistrationPageMobile />
      </div>
    </main>
  );
}

// import dynamic from "next/dynamic";

// const BoardingPass = dynamic(() => import("@/components/boarding/boardingPass"));
// const BoardingPassMobile = dynamic(() => import("@/components/boarding/boardingPassMobile"));

// export default function Page() {
//   return (
//     <main>
//       <div className="hidden xl:block">
//         <BoardingPass />
//       </div>
//       <div className="block xl:hidden">
//         <BoardingPassMobile />
//       </div>
//     </main>
//   );
// }