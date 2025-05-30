
import type { HeaderProps } from '../../../models/index-model'

export default function AppNavbar({ title, subtitle, icon }: HeaderProps) {
  return (
    <nav className="p-4 shadow bg-white mt-5">
      <div className="flex items-center space-x-2">
        {icon && <span>{icon}</span>}
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </nav>
  );
}
