import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../components/ui/Input";
import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

const roomSchema = z.object({
  username: z.string().min(3).max(100),
  room: z.string().min(1),
});

type RoomInputs = z.infer<typeof roomSchema>;

export const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomInputs>({
    resolver: zodResolver(roomSchema),
  });

  const onSubmit: SubmitHandler<RoomInputs> = (values) => {
    console.log(values);
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto max-w-md flex-1 rounded border p-4 shadow">
        <p>Connected: {isConnected}</p>

        <p className="text-center text-xl">kablasan rooms</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input label="Username" {...register("username")} />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="flex flex-col gap-1 text-sm text-gray-500">
              select room
              <select
                {...register("room")}
                className="rounded border-2 bg-white p-4 py-2 text-black"
              >
                <option value="">--select room--</option>
                <option value="javascript">javascript</option>
                <option value="typescript">typescript</option>
                <option value="frontend-framework">frontend frameworks</option>
                <option value="nodejs">node.js</option>
                <option value="php">php</option>
              </select>
            </label>
            {errors.room && (
              <p className="text-sm text-red-500">{errors.room.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="rounded bg-black p-2 font-semibold text-white"
          >
            join room
          </button>
        </form>
      </div>
    </div>
  );
};
