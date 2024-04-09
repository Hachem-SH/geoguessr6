"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import ThreeDotAnimation from "@/components/ThreeDotAnimation";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Gestion du changement de nom d'utilisateur
  const handleUsernameChange = (e) => setUsername(e.target.value);
  // Gestion du changement d'email
  const handleEmailChange = (e) => setEmail(e.target.value);
  // Gestion du changement de mot de passe
  const handlePasswordChange = (e) => setPassword(e.target.value);
  // Fonction pour effacer les champs d'entrée
  const clearInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // Appel de la fonction de registre utilisateur
    registerUser(username, email, password)
      .then((res) => {
        clearInputs();
        setLoading(false);
        // Redirection vers la page de connexion après inscription réussie
        router.push("/login");
      })
      .catch((e) => {
        // Gestion des erreurs
        setError(e.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('/fondliege.svg')` }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-96 text-gray-800">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">
            {/* Affichage de l'animation de chargement ou du texte "Signup" */}
            {loading ? <ThreeDotAnimation text="Signup" /> : "Signup"}
          </h2>
          {/* Affichage des erreurs s'il y en a */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Username"
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Your Email"
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Password"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="text-indigo-500 form-checkbox"
                defaultChecked
              />
              <span className="ml-2 text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-500">
                  Terms of Service
                </a>
              </span>
            </label>
            <p className="text-gray-600">
              Already Have An Account?{" "}
              {/* Lien vers la page de connexion */}
              <Link href="/login" className="text-indigo-500">
                Login
              </Link>
            </p>
          </div>
          <div>
            {/* Bouton de soumission */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
