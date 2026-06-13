// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";

// export default function ProfilePage() {
//   const { data: session } = useSession();

//   if (!session?.user) return null;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 space-y-6">
//       {/* Header */}
//       <Card>
//         <CardContent className="flex items-center gap-6 p-6">
//           <Avatar className="h-20 w-20">
//             <AvatarImage src={session.user.image ?? ""} />
//             <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
//           </Avatar>

//           <div>
//             <h2 className="text-2xl font-bold">{session.user.name}</h2>
//             <p className="text-muted-foreground">{session.user.email}</p>

//             <div className="mt-2">
//               <Badge variant="secondary">Demo Account</Badge>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Account Info */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Account Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-2 text-sm">
//           <p>
//             <span className="font-medium">User ID:</span> {session.user.id}
//           </p>
//           <p>
//             <span className="font-medium">Member Since:</span>{" "}
//             {/* Replace with createdAt if you expose it */}
//             2025
//           </p>
//         </CardContent>
//       </Card>

//       {/* Security */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Security</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Button variant="outline">Change Password</Button>
//           <Button variant="outline">Enable 2FA (Coming Soon)</Button>
//         </CardContent>
//       </Card>

//       {/* Danger Zone */}
//       <Card className="border-red-500/40">
//         <CardHeader>
//           <CardTitle className="text-red-600">Danger Zone</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Button variant="destructive" onClick={() => signOut()}>
//             Logout
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // your NextAuth config
import { prisma } from "@exchange-lab/db";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Fetch fresh user data from DB (not from JWT)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      wallet: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.image ?? undefined} />
                <AvatarFallback className="text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user.name || "User"}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Balance */}
        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${user.wallet?.balance.toString() || "0.00"}
            </div>
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Email Verified</span>
              <span
                className={
                  user.emailVerified ? "text-green-600" : "text-red-600"
                }>
                {user.emailVerified ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Account Status</span>
              <span
                className={
                  user.isVerified ? "text-green-600" : "text-yellow-600"
                }>
                {user.isVerified ? "Verified" : "Pending"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Account ID</span>
              <span className="font-mono text-sm">{user.id}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
