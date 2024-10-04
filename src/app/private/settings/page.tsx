import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import { fetchUsers } from "@/action/user";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const Settings = async () => {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }

  const users = await fetchUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">users</h1>
      <table className="w-full rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.lastName}</td>
              <td className="p-2">                
              <form action={async () => {
                "use server"
                await prisma.user.delete({
                  where: {
                    id: user.id
                  }
                });
                // Refresh the page or update the user list
                revalidatePath('/private/settings');
              }} className="inline">
                <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </form>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;