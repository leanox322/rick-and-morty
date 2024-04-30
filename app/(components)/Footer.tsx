import { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 shadow-lg">
      <div className="container flex justify-around items-start">
        <div>
          <h3 className="text-xl font-semibold mb-2">Contacts</h3>
          <p>
            <span className="font-semibold">Name:</span> P. Afanasenko
          </p>
          <p>
            <span className="font-semibold">GitHub:</span> leanox322
          </p>
          <p>
            <span className="font-semibold">Email:</span> pashash4rk@gmail.com
          </p>
          <Link
            href="https://rickandmortyapi.com/documentation/#episode-schema"
            className="font-semibold hover:text-yellow-400"
          >
            API Link
          </Link>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
          <ul className="list-disc pl-5">
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>REST & GraphQL</li>
            <li>Tailwind</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
