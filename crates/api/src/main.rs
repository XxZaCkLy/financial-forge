use axum::{routing::get, Router};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    // Define routes
    let app = Router::new()
        .route("/health", get(|| async { "ok" }))
        .route("/hello", get(|| async { "Hello from Financial Forge API!" }));

    // Bind to port 3000
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    println!("🚀 API running on http://{addr}");
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}