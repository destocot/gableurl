import { redirect } from "next/navigation";

type PageProps = {
  params: { hash: string };
};

export default function Page({ params: { hash } }: PageProps) {
  redirect(`/preview/${hash}`);
}
