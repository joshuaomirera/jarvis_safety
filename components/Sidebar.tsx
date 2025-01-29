// components/Sidebar.tsx

interface SidebarItem {
  title: string
  onClick: () => void
}

const Sidebar = ({ items }: { items: SidebarItem[] }) => {
  return (
    <aside className="w-64 h-full bg-gray-50 p-6 border-r">
      <nav>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <button
                onClick={item.onClick}
                className="w-full text-left block p-2 hover:bg-gray-100 rounded transition-colors"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
