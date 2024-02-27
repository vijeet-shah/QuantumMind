import { Appbar } from "../Appbar";
import MainLandingPage from "./main/main-landing";

export default function LandingPage() {
  return (
    <div>
      <Appbar />
      <main className="pt-20 ">
        <MainLandingPage />
      </main>
    </div>
  );
}
