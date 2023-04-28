import type { User } from "@app/types";
import Image from "next/image";

// UI component for user profile
export default function UserProfile({ user }: { user: User }) {
  return (
    <div className="box-center">
      <Image
        src={user.photoURL || '/hacker.png'}
        className="card-img-center"
        alt={`${user.displayName}'s avatar`}
        />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || 'Anonymous User'}</h1>
    </div>
  );
}
