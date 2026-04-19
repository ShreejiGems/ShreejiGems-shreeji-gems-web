import React from "react"
import Image from "next/image"

interface ShreejiLoaderProps {
    size?: "small" | "medium" | "large"
    color?: string
    text?: string
    fullScreen?: boolean
}

const ShreejiLoader: React.FC<ShreejiLoaderProps> = ({
    size = "small",
    color = "#FF6B35",
    text = "Loading...",
    fullScreen = false
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case "small":
                return {
                    container: "w-16 h-16",
                    logo: { width: 60, height: 27 },
                    text: "text-xs",
                    thread: "h-1"
                }
            case "large":
                return {
                    container: "w-24 h-24",
                    logo: { width: 100, height: 45 },
                    text: "text-sm",
                    thread: "h-2"
                }
            default:
                return {
                    container: "w-20 h-20",
                    logo: { width: 80, height: 36 },
                    text: "text-sm",
                    thread: "h-1.5"
                }
        }
    }

    const sizes = getSizeClasses()

    const loaderContent = (
        <div className="flex flex-col items-center justify-center space-y-3">
            {/* Logo with continuous thread animation */}
            <div className={`relative ${sizes.container} flex items-center justify-center`}>
                {/* Center logo */}
                <div className="relative z-10">
                    <Image
                        src="/assets/home/Shreeji Gems Logo.svg"
                        width={sizes.logo.width}
                        height={sizes.logo.height}
                        alt="Shreeji Gems Logo"
                        className="drop-shadow-md"
                    />
                </div>

                {/* Continuous thread ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow"
                    style={{
                        borderColor: color,
                        opacity: 0.8
                    }}>
                </div>
            </div>

            {/* Simple loading text */}
            {text && (
                <div className={`${sizes.text} font-medium`} style={{ color }}>
                    {text}
                </div>
            )}
        </div>
    )

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-orange-200 via-pink-100 to-rose-200 flex items-center justify-center z-50">
                {loaderContent}
            </div>
        )
    }

    return loaderContent
}

export default ShreejiLoader
