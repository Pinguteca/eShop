---
title: Architecture
icon: lucide/drafting-compass
tags:
  - .NET
  - GitHub
robots: noindex, nofollow
---

# Architecture & Repository layout

This page contains diagrams and a quick reference to the repository layout and the main runtime flows. The diagrams are intentionally lightweight (Mermaid) so you can edit them directly in the docs.

<div class="hero">
  <h1>System overview</h1>
  <p>A concise map of services and how events flow between them.</p>
</div>

## System overview

```mermaid
flowchart LR
  subgraph UI
    WebApp[WebApp / ClientApp]
  end

  subgraph APIs
    Catalog[Catalog.API]
    Basket[Basket.API]
    Ordering[Ordering.API]
    Identity[Identity.API]
  end

  subgraph Infrastructure
    EventBus[(Event Bus)]
    Payment[PaymentProcessor]
    OrderWorker[OrderProcessor]
  end

  WebApp -->|HTTP| Catalog
  WebApp -->|HTTP| Basket
  WebApp -->|HTTP| Ordering
  WebApp -->|Auth| Identity

  Ordering -->|Publish: OrderPlaced| EventBus
  Basket -->|Publish: BasketCheckedOut| EventBus

  EventBus --> OrderWorker
  EventBus --> Payment

  Payment -->|callback| Ordering
```

## Order processing sequence

This sequence diagram shows what typically happens when a customer places an order.

```mermaid
sequenceDiagram
  participant U as User
  participant W as WebApp
  participant O as Ordering.API
  participant EB as EventBus
  participant P as PaymentProcessor
  participant OW as OrderProcessor

  U->>W: Checkout
  W->>O: POST /orders
  O->>EB: emit OrderCreated
  EB->>P: deliver OrderCreated
  P->>EB: emit PaymentCompleted
  EB->>OW: deliver PaymentCompleted
  OW->>O: Confirm order
  O-->>W: 200 OK
  W-->>U: order confirmation
```

## Event bus & reliability

The system uses an event-driven approach: APIs publish domain events to the event bus, and background processors consume them. Design considerations:

- Use idempotent consumers to handle duplicate events.
- Persist events and use retry semantics for transient failures.

## Repository layout quick reference

- `src/` — main source projects (APIs, workers, shared libs)
- `tests/` — unit and functional tests
- `.github/workflows/` — CI pipelines
- `artifacts/` — build outputs and published artifacts