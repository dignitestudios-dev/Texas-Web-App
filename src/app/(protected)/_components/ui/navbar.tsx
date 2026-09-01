'use client';

import React, { useState } from 'react';
import { ChevronDown, Bell, User, Languages, LogOut, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getToken, clearAuth, getRole, saveRole, UserRole } from '@/lib/cookies';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'Spanish'>('English');
    const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentRole, setCurrentRole] = useState<UserRole>('giver');

    React.useEffect(() => {
        const updateRoleState = () => {
            setLoggedIn(!!getToken());
            const role = getRole() || 'giver';
            setCurrentRole(role);
        };
        updateRoleState();
        window.addEventListener('roleChange', updateRoleState);
        return () => window.removeEventListener('roleChange', updateRoleState);
    }, []);

    const handleToggleSwitch = (checked: boolean) => {
        const newRole: UserRole = checked ? 'giver' : 'seeker';
        setCurrentRole(newRole);
        saveRole(newRole);
        window.dispatchEvent(new Event('roleChange'));
        if (loggedIn) {
            toast.success(`Switched to ${checked ? 'Caregiver' : 'Care Seeker'} mode`);
        } else {
            toast.info(`Viewing as ${checked ? 'Caregiver' : 'Care Seeker'}`);
        }
        router.refresh();
    };

    return (
        <>
            <nav className="bg-transparent max-w-screen-2xl mx-auto py-3 w-full relative px-4 sm:px-8 lg:px-[150px] z-50 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="w-[80px] h-[80px] relative cursor-pointer shrink-0">
                    <Image src="/images/logo2.webp" alt="Logo" fill className="object-contain" />
                </Link>

                {/* Center: Role Toggle Switch */}
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-1.5 border border-[#E4E4E7] shadow-xs select-none">
                    <span className="font-rubik font-medium text-[13px] sm:text-[14px] text-[#121111] whitespace-nowrap">
                        {loggedIn
                            ? (currentRole === 'giver' ? 'Switch to Caregiver' : 'Switch to Care Seeker')
                            : (currentRole === 'giver' ? 'View as Caregiver' : 'View as Care Seeker')
                        }
                    </span>
                    <Switch
                        checked={currentRole === 'giver'}
                        onCheckedChange={handleToggleSwitch}
                        className={cn(
                            "transition-colors",
                            currentRole === 'giver' ? "bg-[#0A0A6E]" : "bg-[#E4E4E4]"
                        )}
                    />
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center gap-4">
                    {loggedIn ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger render={
                                    <button className="w-[40px] h-[40px] bg-white backdrop-blur-[2px] rounded-[5px] flex items-center justify-center transition select-none outline-none" />
                                }>
                                    <Bell className="text-[#0A0A6E] w-6 h-6" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-[450px] h-[349px] bg-white border border-[#EFEFEF] rounded-2xl p-[30px_15px_15px_15px] flex flex-col gap-[20px] shadow-[0px_17px_7px_rgba(0,0,0,0.01),0px_10px_6px_rgba(0,0,0,0.05),0px_4px_4px_rgba(0,0,0,0.09),0px_1px_2px_rgba(0,0,0,0.1)] outline-none"
                                >
                                    {/* Header */}
                                    <div className="w-[420px] h-[11px] flex flex-col justify-center shrink-0">
                                        <h3 className="font-rubik font-medium text-[16px] leading-[11px] text-[#121111] capitalize">
                                            Notifications
                                        </h3>
                                    </div>

                                    {/* Notification Item 1 */}
                                    <div className="w-[420px] h-[135px] flex gap-[12px] py-[15px] px-0 shrink-0 select-none">
                                        {/* Icon Container */}
                                        <div className="w-[34px] h-[34px] bg-[#FEF0E9] rounded-full flex items-center justify-center shrink-0 relative">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[5px] left-[5px]">
                                                <circle cx="12" cy="12" r="7" stroke="#F36922" strokeWidth="1.5" />
                                                <circle cx="16" cy="8" r="2" fill="#F36922" stroke="#F36922" strokeWidth="1.5" />
                                            </svg>
                                        </div>
                                        {/* Content Container */}
                                        <div className="w-[374px] h-[105px] flex flex-col gap-[10px]">
                                            <div className="w-full h-[19px] flex justify-between items-center">
                                                <span className="font-rubik font-semibold text-[16px] text-[#121111] tracking-[-0.005em]">Your Job has started</span>
                                                <span className="font-rubik font-medium text-[14px] text-[#121111] tracking-[-0.005em]">1min</span>
                                            </div>
                                            <span className="w-full h-[34px] font-rubik font-light text-[14px] text-[#121111] leading-[17px] tracking-[-0.005em] text-left">
                                                Your proposal for the job has been accepted. Job has been started.
                                            </span>
                                            <button className="w-[120px] h-[32px] border border-[#E3E3E3] rounded-lg flex items-center justify-center p-[8px_10px] gap-[10px] hover:bg-neutral-50 transition cursor-pointer font-rubik font-medium text-[14px] leading-[20px] text-[#121111] outline-none">
                                                View Job Info
                                            </button>
                                        </div>
                                    </div>

                                    {/* Notification Item 2 */}
                                    <div className="w-[420px] h-[118px] flex gap-[12px] py-[15px] px-0 shrink-0 select-none">
                                        {/* Avatar Container */}
                                        <div className="w-[34px] h-[34px] rounded-full overflow-hidden shrink-0 border border-neutral-100">
                                            <Image src="/images/avatar.webp" alt="Avatar" width={34} height={34} className="object-cover w-full h-full" />
                                        </div>
                                        {/* Content Container */}
                                        <div className="w-[374px] h-[88px] flex flex-col gap-[10px]">
                                            <div className="w-full h-[19px] flex justify-between items-center">
                                                <span className="font-rubik font-semibold text-[16px] text-[#121111] tracking-[-0.005em]">Nandi Bolard</span>
                                                <span className="font-rubik font-medium text-[14px] text-[#121111] tracking-[-0.005em]">1min</span>
                                            </div>
                                            <span className="w-full h-[17px] font-rubik font-light text-[14px] text-[#121111] leading-[17px] tracking-[-0.005em] text-left">
                                                You got a booking request
                                            </span>
                                            <button className="w-[120px] h-[32px] border border-[#E3E3E3] rounded-lg flex items-center justify-center p-[8px_10px] gap-[10px] hover:bg-neutral-50 transition cursor-pointer font-rubik font-medium text-[14px] leading-[20px] text-[#121111] outline-none">
                                                View Request
                                            </button>
                                        </div>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DropdownMenu>
                                <DropdownMenuTrigger render={
                                    <div className="h-[40px] bg-white backdrop-blur-[2px] rounded-[8px] flex items-center px-5 gap-[15px] cursor-pointer transition select-none outline-none" />
                                }>
                                    <div className="w-6 h-6 rounded-full overflow-hidden bg-white shrink-0">
                                        <Image src="/images/avatar.webp" alt="Avatar" width={24} height={24} className="object-cover w-full h-full" />
                                    </div>
                                    <span className="font-rubik text-[14px] text-black capitalize font-medium">Nandi Bloard</span>
                                    <ChevronDown className="w-[18px] h-[18px] text-black" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    sideOffset={8}
                                    className="w-[300px] h-[292px] overflow-hidden bg-white border border-[#E3E3E3] rounded-lg p-[20px_10px_10px_10px] flex flex-col gap-[10px] shadow-[0px_13px_5px_rgba(0,0,0,0.01),0px_7px_4px_rgba(0,0,0,0.05),0px_3px_3px_rgba(0,0,0,0.09),0px_1px_2px_rgba(0,0,0,0.1)] outline-none"
                                >
                                    {/* Profile Card Section */}
                                    <div className="flex flex-col items-center gap-[8px] w-full h-[104px] pt-1 shrink-0">
                                        {/* Avatar Container */}
                                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-[#F8F9FF] flex items-center justify-center shrink-0 border border-neutral-100 shadow-inner">
                                            <Image src="/images/avatar.webp" alt="Avatar" width={60} height={60} className="object-cover w-full h-full" />
                                        </div>
                                        {/* Profile Name & Email */}
                                        <div className="flex flex-col items-center gap-[3px] h-[36px] justify-end">
                                            <span className="font-rubik font-medium text-[16px] leading-[19px] text-[#121111]">Nandi Bloard</span>
                                            <span className="font-rubik font-light text-[12px] leading-[14px] text-[#3D3D3D]">Nandibloard@gmail.com</span>
                                        </div>
                                    </div>

                                    {/* Settings & Language Section */}
                                    <div className="flex flex-col gap-[10px] w-full pb-2 border-b border-[#EFEFEF] shrink-0">
                                        {/* Profile & Setting Item */}
                                        <Link href="/profile" className="w-full">
                                            <DropdownMenuItem className="w-[280px] h-[40px] px-2 py-3 rounded-lg flex items-center gap-[10px] outline-none cursor-pointer focus:bg-[#FFF6F0] focus:text-[#121111] transition-colors">
                                                <User className="w-5 h-5 text-[#F36922] fill-[#F36922] shrink-0" />
                                                <span className="font-rubik text-[14px] font-normal leading-[25px] text-[#121111] capitalize">Profile & Setting</span>
                                            </DropdownMenuItem>
                                        </Link>

                                        {/* Language Selector Item */}
                                        <DropdownMenuItem
                                            onClick={() => setIsLanguageDialogOpen(true)}
                                            className="w-[280px] h-[40px] px-2 py-3 rounded-lg flex items-center justify-between outline-none cursor-pointer focus:bg-[#FFF6F0] focus:text-[#121111] transition-colors"
                                        >
                                            <div className="flex items-center gap-[10px]">
                                                <Languages className="w-5 h-5 text-[#F36922] shrink-0" />
                                                <span className="font-rubik text-[14px] font-normal leading-[25px] text-[#121111] capitalize">{selectedLanguage}</span>
                                            </div>
                                            <ChevronDown className="w-[18px] h-[18px] text-[#121111] shrink-0" />
                                        </DropdownMenuItem>
                                    </div>

                                    {/* Log Out */}
                                    <DropdownMenuItem
                                        onClick={() => setIsLogoutDialogOpen(true)}
                                        className="w-[280px] h-[40px] px-2 py-3 rounded-lg flex items-center gap-[10px] outline-none cursor-pointer focus:bg-red-50 focus:text-[#C81E1E] transition-colors mt-auto"
                                    >
                                        <LogOut className="w-5 h-5 text-[#C81E1E] shrink-0" />
                                        <span className="font-rubik text-[14px] font-normal leading-[25px] text-[#C81E1E]">Log Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            {/* Sign In Button */}
                            <button
                                type="button"
                                onClick={() => router.push('/role')}
                                className=" text-[#121111] bg-white h-[44px] px-[20px] rounded-[14px] font-rubik font-medium text-[15px] flex items-center justify-center gap-[8px] transition cursor-pointer border-none outline-none "
                            >
                                <User className="w-[18px] h-[18px] text-[#121111]" />
                                <span>Sign In</span>
                            </button>

                            {/* Sign Up Button */}
                            <button
                                type="button"
                                onClick={() => router.push('/role')}
                                className="bg-[#0A0A6E] hover:bg-[#0A0A6E]/90 text-white h-[44px] px-[24px] rounded-[14px] font-rubik font-medium text-[15px] flex items-center justify-center transition cursor-pointer border-none outline-none shadow-sm"
                            >
                                <span>Sign Up</span>
                            </button>
                        </>
                    )}
                </div>
                <div className={cn(' h-[1px]  absolute bottom-0 left-[50%] -translate-x-1/2', pathname !== "/" ? "w-full bg-[#0A0A6E33]" : "w-[80%] bg-white/40")} />
            </nav>

            {/* Select Language Dialog Modal */}
            <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
                <DialogContent
                    showCloseButton={false}
                    className="w-[401px] max-w-[90vw] p-0 rounded-[22px] bg-white overflow-hidden shadow-[9px_9px_28px_rgba(154,52,0,0.16)] border-none outline-none"
                >
                    <div className="w-full flex flex-col items-center pt-5 pb-3 select-none">
                        {/* Title */}
                        <h2 className="font-inter font-medium text-[22px] leading-[26px] text-black mb-4 text-center">
                            Select Language
                        </h2>

                        {/* Options List */}
                        <div className="w-full flex flex-col">
                            {/* English */}
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedLanguage('English');
                                    setIsLanguageDialogOpen(false);
                                }}
                                className={cn(
                                    "w-full h-[67px] px-[28.8px] flex items-center justify-between transition cursor-pointer border-none outline-none text-left",
                                    selectedLanguage === 'English' ? "bg-[#FEF0E9]" : "bg-white hover:bg-neutral-50"
                                )}
                            >
                                <div className="flex items-center gap-[18px]">
                                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 border border-neutral-100 shadow-sm relative">
                                        <Image src="/images/us-flag.svg" alt="English" fill className="object-cover scale-125" />
                                    </div>
                                    <span className="font-inter font-normal text-[24px] leading-[29px] text-black">
                                        English
                                    </span>
                                </div>
                                {selectedLanguage === 'English' ? (
                                    <div className="w-[28.8px] h-[28.8px] bg-[#F36922] rounded-full flex items-center justify-center text-white shrink-0">
                                        <Check className="w-[18px] h-[18px] stroke-[3]" />
                                    </div>
                                ) : (
                                    <div className="w-[28.8px] h-[28.8px] rounded-full border border-black shrink-0" />
                                )}
                            </button>

                            {/* Spanish */}
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedLanguage('Spanish');
                                    setIsLanguageDialogOpen(false);
                                }}
                                className={cn(
                                    "w-full h-[67px] px-[28.8px] flex items-center justify-between transition cursor-pointer border-none outline-none text-left",
                                    selectedLanguage === 'Spanish' ? "bg-[#FEF0E9]" : "bg-white hover:bg-neutral-50"
                                )}
                            >
                                <div className="flex items-center gap-[18px]">
                                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0 border border-neutral-100 shadow-sm relative bg-[#AA1523]">
                                        <svg viewBox="0 0 512 512" className="w-full h-full">
                                            <rect width="512" height="512" fill="#AA1523" />
                                            <rect y="128" width="512" height="256" fill="#F1BF00" />
                                            <rect x="130" y="200" width="50" height="110" rx="6" fill="#AA1523" />
                                            <rect x="140" y="210" width="30" height="90" fill="#F1BF00" />
                                            <circle cx="155" cy="185" r="10" fill="#F1BF00" />
                                        </svg>
                                    </div>
                                    <span className="font-inter font-normal text-[24px] leading-[29px] text-black">
                                        Spanish
                                    </span>
                                </div>
                                {selectedLanguage === 'Spanish' ? (
                                    <div className="w-[28.8px] h-[28.8px] bg-[#F36922] rounded-full flex items-center justify-center text-white shrink-0">
                                        <Check className="w-[18px] h-[18px] stroke-[3]" />
                                    </div>
                                ) : (
                                    <div className="w-[28.8px] h-[28.8px] rounded-full border border-black shrink-0" />
                                )}
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Log Out Confirmation Dialog Modal */}
            <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <DialogContent
                    showCloseButton={false}
                    className="w-[401px] max-w-[90vw] p-6 rounded-[22px] bg-white overflow-hidden shadow-[9px_9px_28px_rgba(154,52,0,0.16)] border-none outline-none flex flex-col items-center text-center gap-3"
                >
                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-[#C81E1E] shadow-sm mb-1">
                        <LogOut className="w-7 h-7 text-[#C81E1E]" />
                    </div>

                    <DialogTitle className="font-rubik font-bold text-[22px] text-[#121111] leading-tight">
                        Log Out Confirmation
                    </DialogTitle>
                    <DialogDescription className="font-rubik font-normal text-[15px] text-[#565656]">
                        Are you sure you want to log out of your account?
                    </DialogDescription>

                    <div className="flex gap-3 w-full mt-4">
                        <button
                            type="button"
                            onClick={() => setIsLogoutDialogOpen(false)}
                            className="flex-1 h-[48px] bg-[#F1F5F9] hover:bg-[#e2e8f0] text-[#121111] font-rubik font-medium text-[15px] rounded-[14px] transition cursor-pointer border-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                clearAuth();
                                setIsLogoutDialogOpen(false);
                                // router.push('/login');
                            }}
                            className="flex-1 h-[48px] bg-[#C81E1E] hover:bg-[#a81818] text-white font-rubik font-medium text-[15px] rounded-[14px] transition cursor-pointer border-none shadow-sm"
                        >
                            Log Out
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Navbar;