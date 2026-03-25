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
