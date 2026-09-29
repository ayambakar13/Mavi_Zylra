import Link from "next/link";

export default function AccountPage() {
  return <main className="commerce-page empty-state"><p className="eyebrow">Zylra Client Experience</p><h1>Your account, when you are ready.</h1><p>Guest checkout is always available. After an order, you can create an account with your email and password, and your guest order will be linked automatically.</p><div className="fallback-actions"><Link className="button" href="/catalog">Explore the Catalog</Link><Link className="text-link" href="/cart">View Bag</Link></div></main>;
}
