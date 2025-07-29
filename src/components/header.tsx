"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchFromAPI } from "@/lib/api";

interface SubMenuItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
}

interface Brand {
  _id: string;
  sectionData: {
    brand: {
      brandname: string;
      brandimage: string;
      trending?: boolean;
    };
  };
}

interface NewBrand {
  _id: string;
  sectionData: {
    newBrand: {
      brandname: string;
      url: string;
      modelCount: number;
    };
  };
  updatedAt: string;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "USED CAR" },
  { label: "NEW CAR" },
  {
    label: "SERVICES",
    submenu: [{ label: "SERVICE", href: "/services" }],
  },
  { label: "FINANCE", href: "/finance" },
  { label: "INSURANCE", href: "/insurance" },
  { label: "FRANCHISE", href: "/franchise" },
  { label: "RTO SERVICE", href: "/rto-service" },
];

const LoginForm: React.FC<{ role: string; onClose: () => void }> = ({
  role,
  onClose,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login for {role} Dashboard</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter your registered mobile number
            </label>
            <input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white p-2 rounded-md hover:from-blue-700 hover:to-green-600 transition duration-300">
            Get OTP
          </button>
          <div className="text-center text-sm text-gray-500">
            {"Don't have an account? "}
            <button onClick={onClose} className="text-blue-600 hover:underline">
              Create new account
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700 font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const RegistrationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Sell your cars on caryanams.com and get more clients
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {
            "Manage & Sell your all cars at one place, it's just easy and quick."
          }
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First name *
            </label>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last name *
            </label>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter your registered mobile number *
            </label>
            <input
              type="tel"
              placeholder="Enter your register mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
              disabled
            />
          </div>
          <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white p-2 rounded-md hover:from-blue-700 hover:to-green-600 transition duration-300">
            Get OTP
          </button>
          <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white p-2 rounded-md hover:from-blue-700 hover:to-green-600 transition duration-300 mt-2">
            Create Account
          </button>
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button onClick={onClose} className="text-blue-600 hover:underline">
              Login
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-gray-700 font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [newBrands, setNewBrands] = useState<NewBrand[]>([]);
  const [showLogin, setShowLogin] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const cached = localStorage.getItem("brandsData");
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const isFresh = Date.now() - timestamp < 24 * 60 * 60 * 1000;
          if (isFresh) {
            setBrands(data);
            return;
          }
        }

        const freshData = await fetchFromAPI<Brand>({
          dbName: "caryanams",
          collectionName: "brand",
          limit: 0,
        });

        setBrands(freshData);
        localStorage.setItem(
          "brandsData",
          JSON.stringify({ data: freshData, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    const loadNewBrands = async () => {
      try {
        const cached = localStorage.getItem("newBrandsData");
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const isFresh = Date.now() - timestamp < 24 * 60 * 60 * 1000;
          if (isFresh) {
            setNewBrands(data);
            return;
          }
        }

        const freshData = await fetchFromAPI<NewBrand>({
          dbName: "caryanams",
          collectionName: "newbrand",
          limit: 0,
        });

        setNewBrands(freshData);
        localStorage.setItem(
          "newBrandsData",
          JSON.stringify({ data: freshData, timestamp: Date.now() })
        );
      } catch (error) {
        console.error("Failed to fetch new brands:", error);
      }
    };

    loadBrands();
    loadNewBrands();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const closeDropdownAndMobileMenu = () => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const generateBrandSlug = (brandname: string): string => {
    return encodeURIComponent(brandname.toLowerCase().replace(/\s+/g, "-"));
  };

  const isNavItemActive = (item: NavItem): boolean => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.label === "USED CAR") {
      return pathname.startsWith("/buy-used") || pathname.startsWith("/used");
    }
    if (item.label === "NEW CAR") {
      return pathname.startsWith("/newcar") || pathname.startsWith("/new");
    }
    if (item.submenu) {
      return item.submenu.some((sub) => pathname === sub.href);
    }
    return false;
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" onClick={closeDropdownAndMobileMenu}>
              <Image
                src="/logo.png"
                alt="Caryanams"
                width={130}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item);
              if (item.label === "NEW CAR") {
                return (
                  <div key="NEW CAR" className="relative group font-semibold">
                    <div
                      className={`inline-flex items-center transition focus:outline-none cursor-pointer ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      NEW CAR
                      <svg
                        className="ml-1 h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                      </svg>
                    </div>
                    <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-4">
                      <h4 className="text-sm font-bold text-gray-700 mb-2">
                        Popular Brands
                      </h4>
                      <ul className="space-y-4">
                        {newBrands.slice(0, 5).map((brand) => (
                          <li key={brand._id}>
                            <Link
                              href={`/newcar/${generateBrandSlug(
                                brand.sectionData.newBrand.brandname
                              )}`}
                              onClick={closeDropdown}
                              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 text-sm"
                            >
                              <span>
                                {brand.sectionData.newBrand.brandname}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({brand.sectionData.newBrand.modelCount} models)
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 text-start">
                        <Link
                          href="/new/models"
                          onClick={closeDropdown}
                          className="text-blue-600 text-sm hover:underline font-medium"
                        >
                          VIEW ALL
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.label === "USED CAR") {
                return (
                  <div key="USED CAR" className="relative group font-semibold">
                    <div
                      className={`inline-flex items-center transition focus:outline-none cursor-pointer ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      USED CAR
                      <svg
                        className="ml-1 h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                      </svg>
                    </div>
                    <div className="absolute left-0 mt-2 w-[700px] grid grid-cols-3 gap-4 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-6">
                      <div className="space-y-4 text-start">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">
                          Popular Brands
                        </h4>
                        {brands
                          .filter((brand) => brand.sectionData.brand.trending)
                          .map((brand) => (
                            <Link
                              key={brand._id}
                              href={`/buy-used/${encodeURIComponent(
                                brand.sectionData.brand.brandname.toLowerCase()
                              )}`}
                              onClick={closeDropdown}
                              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 text-sm mb-1"
                            >
                              {brand.sectionData.brand.brandimage && (
                                <Image
                                  src={brand.sectionData.brand.brandimage}
                                  alt={brand.sectionData.brand.brandname}
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              )}
                              <span>{brand.sectionData.brand.brandname}</span>
                            </Link>
                          ))}
                        <Link
                          href="/buy-used-car"
                          onClick={closeDropdown}
                          className="text-blue-600 text-sm hover:underline font-medium mt-2 block"
                        >
                          VIEW ALL
                        </Link>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">
                          Popular Cities
                        </h4>
                        {[
                          "Ahmedabad",
                          "Surat",
                          "Vadodara",
                          "Rajkot",
                          "Gandhinagar",
                          "Bhavnagar",
                          "Jamnagar",
                          "Mehsana",
                          "Junagadh",
                          "Kheda",
                        ].map((city) => (
                          <Link
                            key={city}
                            href={`/used/buy?city=${city.toLowerCase()}`}
                            onClick={closeDropdown}
                            className="block text-sm text-gray-700 hover:text-blue-600 mb-1"
                          >
                            {city}
                          </Link>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">
                          Fuel Type
                        </h4>
                        {[
                          "DIESEL",
                          "CNG+PETROL",
                          "PETROL",
                          "ELECTRIC",
                          "HYBRID",
                        ].map((fuel) => (
                          <Link
                            key={fuel}
                            href={`/used/buy?fuel=${fuel.toLowerCase()}`}
                            onClick={closeDropdown}
                            className="block bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-800 hover:text-blue-600"
                          >
                            {fuel}
                          </Link>
                        ))}
                        <h4 className="text-sm font-bold text-gray-700 mt-4 mb-2">
                          Transmission
                        </h4>
                        {[
                          "MANUAL TRANSMISSION",
                          "AUTOMATIC TRANSMISSION",
                          "DUAL-CLUTCH TRANSMISSION",
                          "CONTINUOUSLY VARIABLE TRANSMISSION",
                          "SEMI-AUTOMATIC TRANSMISSION",
                        ].map((trans) => (
                          <Link
                            key={trans}
                            href={`/used/buy?transmission=${trans
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            onClick={closeDropdown}
                            className="block bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-800 hover:text-blue-600"
                          >
                            {trans}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return item.submenu ? (
                <div key={item.label} className="relative group font-semibold">
                  <div
                    className={`inline-flex items-center transition focus:outline-none cursor-pointer ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.label}
                    <svg
                      className="ml-1 h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                    </svg>
                  </div>
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={closeDropdown}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`transition font-semibold ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/login"
              className="inline-block px-4 py-2 bg-gradient-to-r from-[#004C97] to-[#D2AE42] text-white font-semibold rounded hover:from-[#004C97] hover:to-[#D2AE42] hover:opacity-90 transition"
            >
              SELL ON CARYANAMS
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 bg-white z-50 overflow-y-auto transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <Link href="/" onClick={closeDropdownAndMobileMenu}>
            <Image
              src="/logo.png"
              alt="Caryanams"
              width={130}
              height={40}
              className="object-contain"
            />
          </Link>
          <button
            onClick={closeDropdownAndMobileMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item);
            const isDropdownOpen = openDropdown === item.label;

            if (item.label === "NEW CAR") {
              return (
                <div key="NEW CAR" className="flex flex-col">
                  <button
                    onClick={() => toggleDropdown("NEW CAR")}
                    className={`flex items-center justify-between font-semibold py-2 ${
                      isActive ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    NEW CAR
                    <svg
                      className={`h-4 w-4 fill-current transform transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="pl-4 space-y-2">
                      <h4 className="text-sm font-bold text-gray-700">
                        Popular Brands
                      </h4>
                      {newBrands.slice(0, 5).map((brand) => (
                        <Link
                          key={brand._id}
                          href={`/newcar/${generateBrandSlug(
                            brand.sectionData.newBrand.brandname
                          )}`}
                          onClick={closeDropdownAndMobileMenu}
                          className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 text-sm py-1"
                        >
                          <span>{brand.sectionData.newBrand.brandname}</span>
                          <span className="text-xs text-gray-500">
                            ({brand.sectionData.newBrand.modelCount} models)
                          </span>
                        </Link>
                      ))}
                      <Link
                        href="/new/models"
                        onClick={closeDropdownAndMobileMenu}
                        className="text-blue-600 text-sm hover:underline font-medium block py-1"
                      >
                        VIEW ALL
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            if (item.label === "USED CAR") {
              return (
                <div key="USED CAR" className="flex flex-col">
                  <button
                    onClick={() => toggleDropdown("USED CAR")}
                    className={`flex items-center justify-between font-semibold py-2 ${
                      isActive ? "text-blue-600" : "text-gray-700"
                    }`}
                  >
                    USED CAR
                    <svg
                      className={`h-4 w-4 fill-current transform transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="pl-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-gray-700">
                          Popular Brands
                        </h4>
                        {brands
                          .filter((brand) => brand.sectionData.brand.trending)
                          .map((brand) => (
                            <Link
                              key={brand._id}
                              href={`/buy-used/${encodeURIComponent(
                                brand.sectionData.brand.brandname.toLowerCase()
                              )}`}
                              onClick={closeDropdownAndMobileMenu}
                              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 text-sm py-1"
                            >
                              {brand.sectionData.brand.brandimage && (
                                <Image
                                  src={brand.sectionData.brand.brandimage}
                                  alt={brand.sectionData.brand.brandname}
                                  width={20}
                                  height={20}
                                  className="object-contain"
                                />
                              )}
                              <span>{brand.sectionData.brand.brandname}</span>
                            </Link>
                          ))}
                        <Link
                          href="/buy-used-car"
                          onClick={closeDropdownAndMobileMenu}
                          className="text-blue-600 text-sm hover:underline font-medium block py-1"
                        >
                          VIEW ALL
                        </Link>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-700">
                          Popular Cities
                        </h4>
                        {[
                          "Ahmedabad",
                          "Surat",
                          "Vadodara",
                          "Rajkot",
                          "Gandhinagar",
                          "Bhavnagar",
                          "Jamnagar",
                          "Mehsana",
                          "Junagadh",
                          "Kheda",
                        ].map((city) => (
                          <Link
                            key={city}
                            href={`/used/buy?city=${city.toLowerCase()}`}
                            onClick={closeDropdownAndMobileMenu}
                            className="block text-sm text-gray-700 hover:text-blue-600 py-1"
                          >
                            {city}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-700">
                          Fuel Type
                        </h4>
                        {[
                          "DIESEL",
                          "CNG+PETROL",
                          "PETROL",
                          "ELECTRIC",
                          "HYBRID",
                        ].map((fuel) => (
                          <Link
                            key={fuel}
                            href={`/used/buy?fuel=${fuel.toLowerCase()}`}
                            onClick={closeDropdownAndMobileMenu}
                            className="block bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-800 hover:text-blue-600 my-1"
                          >
                            {fuel}
                          </Link>
                        ))}
                        <h4 className="text-sm font-bold text-gray-700 mt-2">
                          Transmission
                        </h4>
                        {[
                          "MANUAL TRANSMISSION",
                          "AUTOMATIC TRANSMISSION",
                          "DUAL-CLUTCH TRANSMISSION",
                          "CONTINUOUSLY VARIABLE TRANSMISSION",
                          "SEMI-AUTOMATIC TRANSMISSION",
                        ].map((trans) => (
                          <Link
                            key={trans}
                            href={`/used/buy?transmission=${trans
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            onClick={closeDropdownAndMobileMenu}
                            className="block bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-800 hover:text-blue-600 my-1"
                          >
                            {trans}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return item.submenu ? (
              <div key={item.label} className="flex flex-col">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={`flex items-center justify-between font-semibold py-2 ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item.label}
                  <svg
                    className={`h-4 w-4 fill-current transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="pl-4 space-y-2">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={closeDropdownAndMobileMenu}
                        className="block text-gray-700 hover:text-blue-600 text-sm py-1"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                onClick={closeDropdownAndMobileMenu}
                className={`font-semibold py-2 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            onClick={closeDropdownAndMobileMenu}
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded hover:from-blue-700 hover:to-green-600 transition text-center"
            aria-label="Sell on Caryanams"
          >
            SELL ON CARYANAMS
          </Link>
        </nav>
      </div>

      {showLogin && (
        <LoginForm role={showLogin} onClose={() => setShowLogin(null)} />
      )}
      {showRegistration && (
        <RegistrationForm onClose={() => setShowRegistration(false)} />
      )}
    </header>
  );
};

export default Header;
