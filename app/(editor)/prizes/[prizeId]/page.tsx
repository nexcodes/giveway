import { getPrizeForUser, getUser } from "@/actions/supabase-actions"
import { notFound, redirect } from "next/navigation"
import PrizeForm from "../../_components/prize-form"
import { Spinner } from "@/components/misc/spinner"

interface PrizePageProps {
    params: { prizeId: string }
  }

export default async function PrizePage({ params }: PrizePageProps) {
    const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  const prize = await getPrizeForUser(params.prizeId)

  if(prize === undefined) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size={"lg"} />
      </div>
    )
  }

  if (!prize) {
    notFound()
  }
    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <PrizeForm prize={prize} />
        </div>
    )
}