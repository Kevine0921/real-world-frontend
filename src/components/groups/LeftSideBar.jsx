"use client";

import { useState } from "react";
import { MessageCircle, Users, Hammer, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      icon: MessageCircle,
      label: "Messages",
      color: "bg-purple-500/10",
      content: "Messages Content",
    },
    {
      icon: Users,
      label: "Users",
      color: "bg-blue-500/10",
      content: "Users Content",
    },
    {
      icon: Hammer,
      label: "Tools",
      color: "bg-green-500/10",
      content: "Tools Content",
    },
    {
      icon: Search,
      label: "Search",
      color: "bg-orange-500/10",
      content: "Search Content",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
            className={cn(
              "h-full w-full p-4 hidden",
              activeTab === index && "block",
              tab.color
            )}
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              {tab.label}
            </h2>
            <p className="text-slate-300">{tab.content}</p>
          </div>
        ))}
      </main>

      {/* Navigation Bar */}
      <nav className="border-t border-slate-800 bg-slate-900">
        <div className="flex justify-around items-center h-16">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-lg transition-colors",
                  activeTab === index
                    ? "text-white bg-slate-800"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                )}
                aria-label={tab.label}
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
