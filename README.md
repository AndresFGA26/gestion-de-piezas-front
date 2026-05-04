# 🎨 Frontend - Gestión de Piezas

## 📋 Descripción del Aplicación

Aplicación React 19+ SPA (Single Page Application) moderna para la gestión completa del ciclo de vida de piezas de manufactura. Implementa una interfaz de usuario intuitiva con autenticación JWT, CRUD completo, visualización de datos en tiempo real y una experiencia de usuario optimizada para entornos de producción.

## 🏗️ Arquitectura General del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Auth Service   │    │ Pieces Service  │
│   (React SPA)   │◄──►│  (Laravel JWT)  │◄──►│  (Laravel API)  │
│                 │    │                 │    │                 │
│ - React 19+     │    │ - JWT Tokens    │    │ - Business Logic│
│ - TypeScript    │    │ - User Mgmt     │    │ - Data Models   │
│ - Tailwind CSS  │    │ - Session Mgmt  │    │ - CRUD API      │
│ - React Query   │    │ - Token Refresh │    │ - Reports       │
│ - Zustand Store │    │ - Validation    │    │ - Calculations  │
│   Frontend     │◄──►│  Auth Service   │◄──►│ Pieces Service │
│   React/TS     │ JWT │   (Laravel)     │ JWT │   (Laravel)     │
│   Port: 5173    │    │   Port: 8000    │    │   Port: 8001    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Supabase      │
                    │  (PostgreSQL)   │
                    └─────────────────┘
```

## 📂 Estructura del Proyecto

```
gestion-de-piezas-front/
├── 📁 public/                     # Archivos estáticos
│   ├── index.html                 # HTML principal
│   └── favicon.ico               # Icono de la aplicación
│
├── 📁 src/
│   ├── app/
│   │   ├── App.tsx               # Componente principal
│   │   ├── layout.tsx            # Layout de la aplicación
│   │   └── providers.tsx         # Proveedores (Query, Router)
│   │
│   ├── components/
│   │   ├── ui/                  # Componentes UI reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Header con navegación
│   │   │   ├── Sidebar.tsx         # Menú lateral
│   │   │   └── Layout.tsx          # Layout principal
│   │   └── pieces/
│   │       ├── PieceCard.tsx        # Card de pieza
│   │       ├── PieceForm.tsx        # Formulario de pieza
│   │       └── PieceList.tsx        # Lista de piezas
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api.ts             # API de autenticación
│   │   │   ├── hooks.ts            # Hooks de auth (login, register)
│   │   │   └── store.ts           # Zustand store de auth
│   │   └── pieces/
│   │       ├── api.ts             # API de piezas
│   │       └── hooks.ts           # Hooks de piezas (CRUD)
│   │
│   ├── lib/
│   │   ├── apiClient.ts         # Configuración de Axios
│   │   └── utils.ts            # Utilidades varias
│   │
│   ├── routes/
│   │   ├── __root.tsx          # Ruta raíz
│   │   ├── login.tsx            # Página de login
│   │   ├── register.tsx         # Página de registro
│   │   ├── dashboard.tsx        # Dashboard principal
│   │   ├── blocks.tsx           # Gestión de bloques
│   │   ├── pieces.tsx           # Gestión de piezas
│   │   └── reports.tsx          # Reportes
│   │
│   ├── types/
│   │   ├── api.ts              # Tipos de API
│   │   ├── auth.ts             # Tipos de autenticación
│   │   └── pieces.ts           # Tipos de piezas
│   │
│   ├── config/
│   │   └── api.ts              # Configuración de URLs de API
│   │
│   ├── index.css                # Estilos globales
│   └── main.tsx               # Punto de entrada
│
├── 📄 package.json             # Dependencias y scripts
├── 📄 vite.config.ts          # Configuración de Vite
├── 📄 tsconfig.json           # Configuración de TypeScript
├── 📄 tailwind.config.js     # Configuración de TailwindCSS
└── 📄 README.md               # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.2.5** - Framework de UI moderno con Concurrent Features
- **TypeScript** - Tipado estático y desarrollo robusto
- **Vite 5.4** - Build tool ultra-rápido con HMR
- **TailwindCSS 3.4** - Framework CSS utility-first

### Estado y Routing
- **TanStack Query** - Manejo de estado del servidor y cache
- **TanStack Router** - Routing moderno con hooks
- **Zustand** - Estado global del cliente (auth)

### HTTP y API
- **Axios** - Cliente HTTP con interceptores
- **Lucide React** - Iconos modernos y consistentes

### Desarrollo
- **ESLint** - Linting y calidad de código
- **Prettier** - Formateo automático
- **PostCSS** - Procesamiento de CSS

## 🚀 Instalación y Ejecución

### Prerrequisitos
- **Node.js 18+**
- **npm** o **yarn**

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
echo "VITE_AUTH_API_URL=http://localhost:8000/api/v1" > .env
echo "VITE_PIECES_API_URL=http://localhost:8001/api/v1" >> .env

# 3. Iniciar desarrollo
npm run dev
```

### Scripts Disponibles

```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 5173",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit"
  }
}
```

### Verificación

```bash
# Verificar que el servidor esté corriendo
curl http://localhost:5173

# Verificar configuración de API
grep VITE_ .env
```

## 📡 Arquitectura de Componentes

### Estructura Jerárquica
```
App
├── Layout
│   ├── Header (navegación, usuario, logout)
│   ├── Sidebar (menú de navegación)
│   └── Main (contenido principal)
│       ├── Dashboard (estadísticas)
│       ├── Projects (lista de proyectos)
│       ├── Blocks (lista de bloques)
│       ├── Pieces (CRUD de piezas)
│       └── Reports (reportes detallados)
└── Auth Routes
    ├── Login (formulario de login)
    └── Register (formulario de registro)
```

### Componentes Reutilizables

#### UI Components
```typescript
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

// Input.tsx
interface InputProps {
  label?: string;
  type?: string;
  error?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
```

#### Layout Components
```typescript
// Header.tsx
interface HeaderProps {
  user?: User;
  onLogout: () => void;
}

// Sidebar.tsx
interface SidebarProps {
  currentPath?: string;
}
```

## 🔐 Autenticación

### Flujo de Autenticación

#### 1. Login
```typescript
const useLogin = () => {
  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (data) => {
      login(data.user, data.token, data.refreshToken);
      navigate({ to: '/' });
    },
  });
};
```

#### 2. Registro
```typescript
const useRegister = () => {
  const register = useMutation({
    mutationFn: (credentials: RegisterCredentials) => registerApi(credentials),
    onSuccess: (data) => {
      login(userData, data.access_token, data.refresh_token);
      navigate({ to: '/' });
    },
  });
};
```

#### 3. Estado Global (Zustand)
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
}
```

### Interceptor de Axios
```typescript
// Configuración automática de tokens
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejo automático de refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Intentar refresh token
      const newToken = await refreshApi(refreshToken);
      // Reintentar request original
    }
    return Promise.reject(error);
  }
);
```

## 📦 Gestión de Piezas

### Hooks de React Query

#### usePieces
```typescript
const usePieces = (filters?: PieceFilters) => {
  return useQuery({
    queryKey: ['pieces', filters],
    queryFn: () => fetchPieces(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: true,
  });
};
```

#### useCreatePiece
```typescript
const useCreatePiece = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (piece: CreatePieceData) => createPiece(piece),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pieces'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};
```

### Componentes de Piezas

#### PieceCard
```typescript
interface PieceCardProps {
  piece: Piece;
  onEdit?: (piece: Piece) => void;
  onDelete?: (id: number) => void;
}

// Estado visual según estado
const getStateColor = (estado: string) => {
  switch (estado) {
    case 'Fabricada': return 'text-green-600 bg-green-50';
    case 'Pendiente': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};
```

#### PieceForm
```typescript
interface PieceFormProps {
  piece?: Piece; // Para edición
  blockId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Validación automática
const validationSchema = z.object({
  peso_teorico: z.number().min(0.01, 'El peso teórico es requerido'),
  peso_real: z.number().min(0, 'El peso real debe ser positivo').optional(),
});
```

## 📊 Dashboard y Reportes

### Dashboard Principal
```typescript
const Dashboard = () => {
  const { data: stats } = useStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Piezas"
        value={stats?.total_piezas}
        icon={Package}
        color="blue"
      />
      <StatCard
        title="Piezas Fabricadas"
        value={stats?.total_fabricadas}
        icon={CheckCircle}
        color="green"
      />
      <StatCard
        title="Piezas Pendientes"
        value={stats?.total_pendientes}
        icon={Clock}
        color="yellow"
      />
      <StatCard
        title="Diferencia Promedio"
        value={`${stats?.diferencia_promedio?.toFixed(2)} kg`}
        icon={TrendingUp}
        color="purple"
      />
    </div>
  );
};
```

### Reportes Detallados
```typescript
const Reports = () => {
  const { data: reports, isLoading } = useReports();
  
  return (
    <div className="space-y-6">
      {/* Resumen General */}
      <ReportSection title="Resumen General">
        <StatGrid stats={reports?.totales} />
      </ReportSection>
      
      {/* Reportes por Proyecto */}
      {reports?.por_proyecto.map((project) => (
        <ReportSection key={project.proyecto.id} title={project.proyecto.name}>
          <ProjectReport data={project} />
        </ReportSection>
      ))}
    </div>
  );
};
```

## 🎨 Diseño y UX

### Sistema de Diseño

#### Colores (TailwindCSS)
```css
/* Colores primarios */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-600: #2563eb;

/* Estados de piezas */
--success-50: #10b981;
--warning-50: #f59e0b;
--error-50: #ef4444;

/* Neutrales */
--gray-50: #f9fafb;
--gray-900: #111827;
```

#### Tipografía
```css
/* Font family */
font-sans: 'Inter', system-ui, sans-serif;
font-mono: 'JetBrains Mono', monospace;

/* Escala tipográfica */
text-xs: 0.75rem;    /* 12px */
text-sm: 0.875rem;   /* 14px */
text-base: 1rem;      /* 16px */
text-lg: 1.125rem;    /* 18px */
text-xl: 1.25rem;     /* 20px */
```

### Componentes UI

#### Botones
```typescript
// Variantes de botones
const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

// Estados
const buttonStates = {
  loading: 'opacity-50 cursor-not-allowed',
  disabled: 'opacity-50 cursor-not-allowed',
  normal: 'cursor-pointer',
};
```

#### Formularios
```typescript
// Inputs estilizados
const inputClasses = `
  w-full px-3 py-2 border border-gray-300 rounded-lg
  focus:ring-2 focus:ring-blue-500 focus:border-transparent
  transition-colors duration-200
`;

// Estados de validación
const inputStates = {
  error: 'border-red-500 focus:ring-red-500',
  success: 'border-green-500 focus:ring-green-500',
  normal: 'border-gray-300',
};
```

## 📱 Responsive Design

### Breakpoints de TailwindCSS
```css
/* Mobile First */
sm: 640px;   /* Tablet pequeña */
md: 768px;   /* Tablet grande */
lg: 1024px;  /* Desktop pequeño */
xl: 1280px;  /* Desktop grande */
2xl: 1536px; /* Desktop extra grande */
```

### Layout Responsivo
```typescript
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards responsivos */}
</div>

// Navegación móvil
<div className="lg:hidden">
  <MobileMenu />
</div>
<div className="hidden lg:block">
  <DesktopMenu />
</div>
```

## 🔄 Estado y Cache

### React Query Configuration
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});
```

### Estrategia de Cache
```typescript
// Cache por query key
queryClient.setQueryData(['pieces', { project_id: 1 }], piecesData);

// Invalidación selectiva
queryClient.invalidateQueries({ 
  queryKey: ['pieces'],
  refetchType: 'active'
});

// Prefetching
queryClient.prefetchQuery({
  queryKey: ['pieces', { block_id: newBlockId }],
  queryFn: () => fetchPieces({ block_id: newBlockId }),
});
```

## 🧪 Testing

### Configuración de Testing
```typescript
// setupTests.ts
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
};
```

### Tests de Componentes
```typescript
// PieceCard.test.tsx
import { renderWithProviders, screen } from '../setupTests';
import { PieceCard } from './PieceCard';

describe('PieceCard', () => {
  it('muestra información de la pieza correctamente', () => {
    const mockPiece = {
      id: 1,
      peso_teorico: 25.5,
      peso_real: 26.0,
      estado: 'Fabricada',
    };
    
    renderWithProviders(<PieceCard piece={mockPiece} />);
    
    expect(screen.getByText('25.50 kg')).toBeInTheDocument();
    expect(screen.getByText('26.00 kg')).toBeInTheDocument();
    expect(screen.getByText('Fabricada')).toBeInTheDocument();
  });
});
```

## 🚀 Build y Despliegue

### Build de Producción
```bash
# Build optimizado
npm run build

# Salida en dist/
├── assets/
│   ├── index-abc123.js      # Bundle principal con hash
│   └── index-def456.css     # CSS con hash
├── index.html                 # HTML principal
└── favicon.ico               # Icono
```

### Configuración de Vite
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
```

### Variables de Entorno
```bash
# .env.production
VITE_AUTH_API_URL=https://api.tu-dominio.com/auth/api/v1
VITE_PIECES_API_URL=https://api.tu-dominio.com/pieces/api/v1
```

## 📈 Performance y Optimización

### Métricas de Performance
- **Bundle Size**: < 500KB gzipped
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Lighthouse Score**: > 90

### Optimizaciones Implementadas
```typescript
// Code splitting
const Dashboard = lazy(() => import('./routes/dashboard'));
const Pieces = lazy(() => import('./routes/pieces'));

// Memoización de componentes
const PieceCard = memo(({ piece }) => {
  return <div>{piece.name}</div>;
});

// Virtual scrolling para listas grandes
const PieceList = () => {
  return (
    <FixedSizeList
      height={600}
      itemCount={pieces.length}
      itemSize={80}
      itemData={pieces}
    >
      {PieceRow}
    </FixedSizeList>
  );
};
```

## 🔧 Mantenimiento

### Tareas Comunes
```bash
# Actualizar dependencias
npm update

# Limpiar cache
npm run build -- --clean

# Verificar seguridad
npm audit

# Análisis de bundle
npm run build -- --analyze
```

### Debugging
```typescript
// React DevTools
// Instalar extensión de React DevTools

// Redux DevTools (para Zustand)
import { devtools } from 'zustand/middleware';

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // ...store implementation
      })
    )
  )
);
```

## 🚨 Troubleshooting

### Problemas Comunes

#### Error: "Network Error"
```bash
# Verificar que los servicios backend estén corriendo
curl http://localhost:8000/api/v1/profile
curl http://localhost:8001/api/v1/pieces

# Verificar configuración CORS en los servicios Laravel
```

#### Error: "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar importaciones
grep -r "import.*from" src/
```

#### Error: "Build failed"
```bash
# Verificar TypeScript
npm run type-check

# Limpiar cache de Vite
rm -rf .vite dist
npm run dev
```

## 📄 Licencia

MIT License - Uso libre con atribución.

---

**Frontend** es la interfaz moderna e intuitiva del sistema, proporcionando una experiencia de usuario excepcional para la gestión de piezas metálicas.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
