"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <>
      <style>{`
        .sonner-toast {
          background-color: white !important;
          color: black !important;
          border: 1px solid #d1d5db !important;
        }
        .sonner-toast-description {
          color: #4b5563 !important;
        }
        .sonner-toast button {
          color: black !important;
        }
      `}</style>
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        toastOptions={{
          classNames: {
            toast: "sonner-toast",
            description: "sonner-toast-description",
          },
        }}
        {...props}
      />
    </>
  )
}

export { Toaster }
