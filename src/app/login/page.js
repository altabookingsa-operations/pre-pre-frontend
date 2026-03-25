import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("@/components/login/loginPage"));
const LoginPageMobile = dynamic(() => import("@/components/login/loginPageMobile"));

export default function Page() {
  return (
    <main>
      <div className="hidden xl:block">
        <LoginPage />
      </div>
      <div className="block xl:hidden">
        <LoginPageMobile />
      </div>
    </main>
  );
}
