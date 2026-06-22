import { useSettingsStore } from '../../store/settingsStore'

function NumberSetting({
  label,
  value,
  onChange,
  min = 1,
  max = 60,
  unit = '分钟',
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  unit?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
        >
          −
        </button>
        <span className="w-12 text-center text-sm font-mono text-white">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
        >
          +
        </button>
        <span className="text-xs text-gray-500">{unit}</span>
      </div>
    </div>
  )
}

function ToggleSetting({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition-colors relative ${
          value ? 'bg-red-500' : 'bg-gray-700'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
            value ? 'translate-x-5.5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export function SettingsPanel() {
  const settings = useSettingsStore()

  return (
    <div className="space-y-6">
      {/* Duration settings */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
          时长设置
        </h3>
        <div className="space-y-3 bg-gray-800/50 rounded-xl p-4">
          <NumberSetting
            label="工作时长"
            value={settings.workDuration}
            onChange={settings.setWorkDuration}
            min={1}
            max={90}
          />
          <NumberSetting
            label="短休息"
            value={settings.shortBreakDuration}
            onChange={settings.setShortBreakDuration}
            min={1}
            max={30}
          />
          <NumberSetting
            label="长休息"
            value={settings.longBreakDuration}
            onChange={settings.setLongBreakDuration}
            min={5}
            max={60}
          />
          <NumberSetting
            label="长休息间隔"
            value={settings.longBreakInterval}
            onChange={settings.setLongBreakInterval}
            min={2}
            max={8}
            unit="个番茄"
          />
        </div>
      </div>

      {/* Auto start */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
          自动开始
        </h3>
        <div className="space-y-3 bg-gray-800/50 rounded-xl p-4">
          <ToggleSetting
            label="自动开始休息"
            value={settings.autoStartBreaks}
            onChange={settings.setAutoStartBreaks}
          />
          <ToggleSetting
            label="自动开始工作"
            value={settings.autoStartWork}
            onChange={settings.setAutoStartWork}
          />
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
          提醒
        </h3>
        <div className="space-y-3 bg-gray-800/50 rounded-xl p-4">
          <ToggleSetting
            label="声音提醒"
            value={settings.soundEnabled}
            onChange={settings.setSoundEnabled}
          />
          <ToggleSetting
            label="桌面通知"
            value={settings.notificationEnabled}
            onChange={settings.setNotificationEnabled}
          />
        </div>
      </div>
    </div>
  )
}
