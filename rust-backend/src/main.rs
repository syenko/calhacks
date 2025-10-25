use axum::{routing::get, Json, Router};
use imessage_database::{
    error::table::TableError,
    tables::{
        messages::Message,
        table::{get_connection, Table},
    },
    util::dirs::default_db_path,
};
use serde::Serialize;
use std::net::SocketAddr;

#[derive(Serialize)]
struct Msg {
    id: i32,
    text: Option<String>,
    is_from_me: bool,
}

async fn test_messages() -> Result<Json<Vec<Msg>>, String> {
    let db = get_connection(&default_db_path()).unwrap();

    let mut collected = Vec::new();

    // Consume entire stream (small MVP DB — fine)
    let _ = Message::stream(&db, |mres| {
        match mres {
            Ok(mut m) => {
                m.generate_text(&db);
                collected.push(Msg {
                    id: m.rowid,
                    text: m.text.clone(),
                    is_from_me: m.is_from_me == true,
                });
            }
            Err(e) => eprintln!("Err: {:?}", e),
        }
        Ok::<(), TableError>(())
    });

    // Just trim to first 20 for test purposes
    if collected.len() > 20 {
        collected.truncate(20);
    }

    Ok(Json(collected))
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/test/messages", get(|| async { test_messages().await }));

    let addr = SocketAddr::from(([127,0,0,1], 5555));
    println!("http://127.0.0.1:5555");

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
