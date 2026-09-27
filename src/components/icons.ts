import {
    Building2,
    CircleCheck,
    ClipboardList,
    DoorOpen,
    House,
    Landmark,
    LucideIcon,
    MapPin,
    MousePointerClick,
    Network,
    Recycle,
    RefreshCw,
    Smartphone,
    Store,
    Truck,
    Warehouse,
} from 'lucide-react';
import { InfoCardIconKey } from '../types';

// Registro único dos ícones de linha usados nos cards premium. Os dados
// (slideContent.ts) referenciam só a chave, nunca o componente.
export const ICONS: Record<InfoCardIconKey, LucideIcon> = {
    'map-pin': MapPin,
    truck: Truck,
    recycle: Recycle,
    house: House,
    store: Store,
    building: Building2,
    'door-open': DoorOpen,
    pointer: MousePointerClick,
    network: Network,
    clipboard: ClipboardList,
    refresh: RefreshCw,
    check: CircleCheck,
    smartphone: Smartphone,
    warehouse: Warehouse,
    landmark: Landmark,
};
