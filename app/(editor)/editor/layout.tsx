interface EditorProps {
  children?: React.ReactNode
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="container px-4 sm:px-8 mx-auto grid items-start gap-6 md:gap-10 py-8">
      {children}
    </div>
  )
}
