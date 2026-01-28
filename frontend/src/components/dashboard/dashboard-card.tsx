import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { useRef, useState, type CSSProperties, type FC, type MouseEvent, type SVGProps } from "react"

interface DashboardCardProps {
  type: string
  icon: LucideIcon
  logo?: FC<SVGProps<SVGSVGElement>>
  number: string
  holder: string
  expiry: string
  balance?: string
  gradient?: string
}

const DashboardCard: FC<DashboardCardProps> = ({
  type,
  icon: Icon,
  logo: Logo,
  number,
  holder,
  expiry,
  balance,
  gradient = "from-blue-600 to-indigo-800",
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({})

  // Basic 3D tilt on mouse move
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (-y / rect.height) * 15
    const rotateY = (x / rect.width) * 15
    setTiltStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: "transform 0.1s ease-out",
    })
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.3s ease-in-out",
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={cn(
        "relative aspect-[3/2] w-full rounded-2xl overflow-hidden p-6 text-white shadow-2xl flex flex-col justify-between bg-gradient-to-br cursor-pointer",
        gradient,
        "transition-shadow duration-300 ease-in-out hover:shadow-[0_10px_30px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_10px_40px_rgba(96,165,250,0.7)]",
      )}
    >
      {/* Glowing blobs */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/20 rounded-full blur-3xl opacity-30 dark:opacity-20 z-0 pointer-events-none" />
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl opacity-20 dark:opacity-10 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex justify-between items-center">
        <Icon className="w-6 h-6 opacity-90" />
        {Logo && <div className="w-12 h-auto">{<Logo />}</div>}
        <span className="text-xl font-semibold uppercase tracking-wide">{type}</span>
      </div>

      <div className="w-10 h-8 bg-white/80 rounded-sm mt-4 mb-2 shadow-inner" />
      {balance && <div className="text-sm font-medium text-white/80 mb-1">Balance: {balance}</div>}
      <div className="font-mono text-xl tracking-widest relative z-10">{number}</div>

      <div className="flex justify-between text-sm mt-4 relative z-10">
        <div>
          <p className="uppercase text-xs opacity-70 dark:opacity-50">Card Holder</p>
          <p className="font-semibold">{holder}</p>
        </div>
        <div>
          <p className="uppercase text-xs opacity-70 dark:opacity-50">Expires</p>
          <p className="font-semibold">{expiry}</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
