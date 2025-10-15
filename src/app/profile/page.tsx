"use client";
import { useState } from "react";
import {
  User,
  MapPin,
  Package,
  Phone,
  Home,
  CheckCircle,
  Info,
  LogOut,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCart } from "@/redux/slices/cartSlice";

const SECTIONS = [
  { key: "personal", label: "My Account", icon: <User size={20} /> },
  { key: "orders", label: "My Orders", icon: <Package size={20} /> },
  { key: "addresses", label: "My Addresses", icon: <MapPin size={20} /> },
];

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("personal");
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!user) return null;

  const { fullName, phone } = user;

  const addresses = [
    {
      id: 1,
      fullName: "Danies Mohamed",
      addressLine1: "142/2, Bethany Mansion",
      addressLine2: "BTM Layout",
      city: "Bangalore",
      state: "KA",
      pincode: "560035",
      phone: "+91 9876543210",
      default: true,
    },
  ];

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(clearCart());
    toast.success("Log out Successful ");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-herb-green/5 via-amber-50/30 to-white overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(44,85,48,0.05),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,215,0,0.04),transparent_50%),radial-gradient(circle_at_50%_20%,rgba(74,120,80,0.03),transparent_60%)]"></div>

      {/* 🌿 Main Container */}
      <div className="relative mx-auto flex flex-col md:flex-row w-[90%] md:w-[80%] xl:w-[70%] min-h-[70vh] bg-white rounded-2xl shadow-xl overflow-hidden mt-10 md:mt-16">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col justify-between w-[22%] border-r border-gray-200 bg-white p-5">
          <div>
            <h2 className="text-xl font-bold text-herb-green mb-5">
              My Profile
            </h2>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => setActiveSection(s.key)}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                      activeSection === s.key
                        ? "bg-herb-green text-white shadow-md"
                        : "text-herb-green hover:bg-herb-green/10"
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleLogOut}
            className="mt-8 flex items-center gap-2 text-red-500 font-semibold hover:text-red-600"
          >
            <LogOut size={18} /> Logout
          </button>
        </aside>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-30">
          <h1 className="text-herb-green font-bold text-lg">My Profile</h1>
          <div className="w-6" />
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenu && (
          <div className="fixed inset-0 bg-white z-50 p-6 animate-in fade-in-50">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-herb-green font-bold text-lg">Menu</h2>
              <button onClick={() => setMobileMenu(false)}>
                <X size={22} className="text-herb-green" />
              </button>
            </div>
            <ul className="space-y-3">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => {
                      setActiveSection(s.key);
                      setMobileMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                      activeSection === s.key
                        ? "bg-herb-green text-white"
                        : "text-herb-green hover:bg-herb-green/10"
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
              <button
                onClick={handleLogOut}
                className="mt-5 flex items-center gap-2 text-red-500 font-semibold"
              >
                <LogOut size={18} /> Logout
              </button>
            </ul>
          </div>
        )}

        {/* 🌿 Main Section */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto">
          {/* ✅ MOBILE VIEW (ABFRL Style) */}
          {/* 🌿 MOBILE UI */}
          <div className="md:hidden flex flex-col items-center text-center mt-2 mb-6">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full bg-herb-green/10 flex items-center justify-center mb-3">
              <User size={40} className="text-herb-green" />
            </div>
            <h2 className="font-bold text-herb-green text-lg">{fullName}</h2>
            <p className="text-gray-600 text-sm mb-6">{phone}</p>

            {/* Section Tiles */}
            <div className="w-full flex flex-col gap-3 mb-6">
              {SECTIONS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`flex items-center justify-between px-5 py-4 rounded-lg shadow-sm border text-herb-green border-gray-200 bg-white hover:bg-herb-green/10 transition ${
                    activeSection === item.key
                      ? "border-herb-green bg-herb-green/5"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-herb-green/10">
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <span className="text-gray-400">{">"}</span>
                </button>
              ))}

              {/* Logout */}
              <button
                onClick={handleLogOut}
                className="flex items-center justify-between px-5 py-4 rounded-lg shadow-sm border border-gray-200 bg-white text-red-500 hover:bg-red-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100">
                    <LogOut size={18} />
                  </div>
                  <span className="font-semibold text-sm">Logout</span>
                </div>
                <span className="text-gray-400">{">"}</span>
              </button>
            </div>

            {/* ✅ Section Details — show after selection */}
            <div className="w-full">
              {activeSection === "personal" && (
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left">
                  <h2 className="text-lg font-bold text-herb-green mb-4">
                    Account Information
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Full Name</span>
                      <span className="font-semibold text-herb-green">
                        {fullName}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-500">Mobile Number</span>
                      <span className="font-semibold text-herb-green">
                        {phone}
                      </span>
                    </div>
                  </div>
                </section>
              )}

              {activeSection === "orders" && (
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left">
                  <h2 className="text-lg font-bold text-herb-green mb-4">
                    Order History
                  </h2>
                  <p className="text-sm text-herb-green italic flex items-center justify-center py-4 bg-herb-green/5 border-2 border-dashed border-herb-green/20 rounded-lg">
                    <Package size={16} className="mr-2" /> No orders placed yet
                  </p>
                </section>
              )}

              {activeSection === "addresses" && (
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left">
                  <h2 className="text-lg font-bold text-herb-green mb-4">
                    Saved Addresses
                  </h2>
                  {addresses.length > 0 ? (
                    addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="border border-herb-green/20 rounded-lg p-3 mb-3"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-herb-green">
                            {addr.fullName}
                          </span>
                          {addr.default && (
                            <span className="text-xs text-white bg-herb-green px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {addr.addressLine1}, {addr.addressLine2}, {addr.city},{" "}
                          {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                          <Phone size={14} /> {addr.phone}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-herb-green italic flex items-center justify-center py-4 bg-herb-green/5 border-2 border-dashed border-herb-green/20 rounded-lg">
                      <Info size={16} className="mr-2" /> No addresses added yet
                    </p>
                  )}
                </section>
              )}
            </div>
          </div>

          {/* ✅ DESKTOP VIEW (unchanged) */}
          <div className="hidden md:block">
            {activeSection === "personal" && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-in fade-in-50">
                <h2 className="text-xl font-bold text-herb-green mb-5">
                  Account Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col bg-herb-green/5 p-4 rounded-lg border-l-4 border-herb-green hover:bg-herb-green/10 transition">
                    <label className="flex items-center gap-2 text-sm font-semibold uppercase text-herb-green/80">
                      <User size={16} />
                      Full Name
                    </label>
                    <span className="font-semibold text-herb-green text-lg">
                      {fullName}
                    </span>
                  </div>

                  <div className="flex flex-col bg-herb-green/5 p-4 rounded-lg border-l-4 border-herb-green hover:bg-herb-green/10 transition">
                    <label className="flex items-center gap-2 text-sm font-semibold uppercase text-herb-green/80">
                      <Phone size={16} /> Mobile Number
                    </label>
                    <span className="font-semibold text-herb-green text-lg">
                      {phone}
                    </span>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "addresses" && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-in fade-in-50">
                <h2 className="text-xl font-bold text-herb-green mb-5">
                  Address Book
                </h2>
                {addresses.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="relative bg-white rounded-xl shadow-md p-4 border border-herb-green/20 hover:border-herb-green/50 transition"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-herb-green flex items-center gap-2">
                            <Home size={18} /> {addr.fullName}
                          </h3>
                          {addr.default && (
                            <span className="flex items-center gap-1 bg-herb-green text-white text-xs font-medium px-2 py-1 rounded-full">
                              <CheckCircle size={12} /> Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {addr.addressLine1}, {addr.addressLine2}, {addr.city},{" "}
                          {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-gray-600 text-sm mt-2 flex items-center gap-2">
                          <Phone size={14} /> {addr.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="flex items-center justify-center text-herb-green italic bg-herb-green/5 border-2 border-dashed border-herb-green/20 rounded-lg py-6 text-sm">
                    <Info size={16} className="mr-2" /> No addresses added yet
                  </p>
                )}
              </section>
            )}

            {activeSection === "orders" && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-in fade-in-50">
                <h2 className="text-xl font-bold text-herb-green mb-5">
                  Order History
                </h2>
                <p className="flex items-center justify-center text-herb-green italic bg-herb-green/5 border-2 border-dashed border-herb-green/20 rounded-lg py-6 text-sm">
                  <Package size={16} className="mr-2" /> No orders placed yet
                </p>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
