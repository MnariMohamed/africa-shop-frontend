import { useLanguage } from "@/hooks/useLanguage";
import { IUser, IUserInfo } from "@/lib/types/user";
import React from "react";

interface Props {
  user: IUser | null;
}

const WelcomeSection: React.FC<Props> = ({ user }) => {
  const { t } = useLanguage();

  const name = user?.firstName;

  return (
    <section className="welcome-section bg-gradient-to-r from-palette-primary to-palette-secondary text-white py-8 px-4 md:px-6 rounded-lg shadow-md mb-8 md:mt-4">
      <div className="max-w-2xl mx-auto">
        {user && name && (
          <h1 className="text-2xl md:text-3xl font-bold text-shadow">
            {`Hello, ${name?.[0].toUpperCase() + name?.slice(1)}!`}
          </h1>
        )}
        {!user && (
          <h1 className="text-2xl md:text-3xl font-bold text-shadow">
            {t.welcome}
          </h1>
        )}
        <p className="mt-2 text-lg md:text-xl">{t.welcomeMessage}</p>
      </div>
    </section>
  );
};

export default WelcomeSection;
