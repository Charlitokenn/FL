export default async function SubdomainPage({
    params
}: {
    params: { subdomain: string };
}) {
    const subdomain = await params

    return (
        <div className="flex min-h-screen flex-col bg-linear-to-b from-blue-50 to-white p-4">
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        Welcome to {subdomain.subdomain}'s Space
                    </h1>
                </div>
            </div>
        </div>
    );
}
