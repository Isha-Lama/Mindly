import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api/auth";
import type { User } from "@/api/auth";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Generate random avatar per user
const getRandomAvatar = (username: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    username
  )}&background=random&size=128`;

export default function UsersPage() {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getUsers();

      if (Array.isArray((data as any)?.data)) return (data as any).data;
      if (Array.isArray(data)) return data;
      return [];
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load users. Admin token required.
      </p>
    );
  }

  if (!users.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No users found.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
    
      <Navbar />

      {/* Intro Section */}
<div className="text-center py-8 bg-gradient-to-r from-blue-50 to-white">
  <h1 className="spirax-regular text-yellow-700 mb-2">
    Meet Our Mindly Users
  </h1>
  <p className="scheherazade-new-regular text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
    Here are the amazing minds who are creating, inspiring, and sharing
    stories on Mindly. Connect and get inspired!
  </p>
</div>


      {/* Main content */}
      <div className="p-6 flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <Card
            key={user.id}
            className="bg-blue-50 hover:shadow-lg transition rounded-xl"
          >
            {/* Header */}
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={getRandomAvatar(user.username)}
                  alt={user.username}
                />
                <AvatarFallback>
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <CardTitle className="text-base">{user.username}</CardTitle>

                {/* Role / Position */}
                <span className="text-xs font-medium text-blue-700 capitalize">
                  {user.user_role}
                </span>

                {/* Email */}
                <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                  {user.email}
                </span>
              </div>
            </CardHeader>

            {/* Footer */}
            <CardContent className="flex items-center justify-between pt-2">
              <Badge variant="success" className="text-xs">
                Active
              </Badge>

              <span className="text-xs text-muted-foreground">
                @{user.username}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

     
      <Footer />
    </div>
  );
}
