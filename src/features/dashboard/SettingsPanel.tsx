import { useState } from "react";
import { cn } from "../../utils/cn";

const SettingsPanel = ({ theme }: { theme: string }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: theme === "dark",
    autoCategorize: true,
    currency: "USD",
    dateFormat: "MM/DD/YYYY"
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: typeof prev[setting] === 'boolean' ? !prev[setting] : prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={cn(
          "text-2xl font-bold",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          Settings
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className={cn(
          "rounded-xl p-6",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <h3 className={cn(
            "text-lg font-semibold mb-4",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            General
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={cn(
                  "font-medium",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Dark Mode
                </div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Enable dark theme for better night viewing
                </div>
              </div>
              <button
                onClick={() => toggleSetting('darkMode')}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  settings.darkMode 
                    ? "bg-blue-600" 
                    : theme === "dark" 
                      ? "bg-gray-600" 
                      : "bg-gray-300"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    settings.darkMode ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className={cn(
                  "font-medium",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Notifications
                </div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Receive alerts for budget limits and spending insights
                </div>
              </div>
              <button
                onClick={() => toggleSetting('notifications')}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  settings.notifications 
                    ? "bg-blue-600" 
                    : theme === "dark" 
                      ? "bg-gray-600" 
                      : "bg-gray-300"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    settings.notifications ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className={cn(
                  "font-medium",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Auto-Categorization
                </div>
                <div className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Automatically categorize new transactions
                </div>
              </div>
              <button
                onClick={() => toggleSetting('autoCategorize')}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  settings.autoCategorize 
                    ? "bg-blue-600" 
                    : theme === "dark" 
                      ? "bg-gray-600" 
                      : "bg-gray-300"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    settings.autoCategorize ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className={cn(
          "rounded-xl p-6",
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
        )}>
          <h3 className={cn(
            "text-lg font-semibold mb-4",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Display & Format
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings(prev => ({ ...prev, currency: e.target.value }))}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                )}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>

            <div>
              <label className={cn(
                "block text-sm font-medium mb-2",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                Date Format
              </label>
              <select
                value={settings.dateFormat}
                onChange={(e) => setSettings(prev => ({ ...prev, dateFormat: e.target.value }))}
                className={cn(
                  "w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                )}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className={cn(
        "rounded-xl p-6",
        theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      )}>
        <h3 className={cn(
          "text-lg font-semibold mb-4",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          Data Management
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className={cn(
            "p-4 rounded-lg text-left transition-colors",
            theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 border border-gray-600"
              : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
          )}>
            <div className="font-medium mb-1">Export Data</div>
            <div className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              Download all your financial data
            </div>
          </button>
          
          <button className={cn(
            "p-4 rounded-lg text-left transition-colors",
            theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 border border-gray-600"
              : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
          )}>
            <div className="font-medium mb-1">Import Data</div>
            <div className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              Restore data from backup
            </div>
          </button>
          
          <button className={cn(
            "p-4 rounded-lg text-left transition-colors",
            theme === "dark"
              ? "bg-red-900/30 hover:bg-red-900/50 border border-red-700"
              : "bg-red-50 hover:bg-red-100 border border-red-200"
          )}>
            <div className="font-medium mb-1 text-red-600">Clear All Data</div>
            <div className={cn(
              "text-sm text-red-500"
            )}>
              Permanently delete all data
            </div>
          </button>
        </div>
      </div>

      {/* About */}
      <div className={cn(
        "rounded-xl p-6",
        theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      )}>
        <h3 className={cn(
          "text-lg font-semibold mb-4",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          About
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className={cn(
              "text-sm font-medium mb-1",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              Version
            </div>
            <div className={cn(
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              1.0.0
            </div>
          </div>
          
          <div>
            <div className={cn(
              "text-sm font-medium mb-1",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              Privacy
            </div>
            <div className={cn(
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              All data stays on your device
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
