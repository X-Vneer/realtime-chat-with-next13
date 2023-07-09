import { Loader2 } from "lucide-react"
import React from "react"

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="flex items-center justify-center grow  flex-col gap-4">
      <Loader2 className=" animate-spin w-16 h-16" />
      <p className="text-[#222] text-center text-lg animate-pulse">
        loading...
      </p>
    </div>
  )
}

export default Loading
