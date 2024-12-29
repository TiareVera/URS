import { Slot } from "expo-router";

import { Layout } from "../components/layout";

export default function AppLayout() {
    return (
        <Layout>
            <Slot /> {/* Aquí se renderizan las rutas dinámicas */}
        </Layout>
    );
}
