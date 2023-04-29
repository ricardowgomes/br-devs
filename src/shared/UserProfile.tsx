import type { User } from "@app/types";
import Image from "next/image";

// UI component for user profile
export default function UserProfile({ user }: { user: User }) {
  const imageSrc = user && user.photoURL || '/hacker.png'

  return (
    <div className="box-center">
      <Image
        src={imageSrc}
        className="card-img-center"
        alt={`${user.displayName}'s avatar`}
        width={150}
        height={150}
        />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
  );
}
