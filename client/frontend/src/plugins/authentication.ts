import { useAuthStore } from "@/stores/auth";

export const authentication = {
    async install(){
        const store = useAuthStore();
        try {
            store.attempt();
        } catch (error) {
            return;
        }
        return;
    }
}