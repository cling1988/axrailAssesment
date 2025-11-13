import React, { use, useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, Plus, Search } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { cn } from '@/lib/utils';

const locationOptions = [
  { value: 'kl', label: 'Kuala Lumpur', costPerNight: 194 },
  { value: 'pj', label: 'Petaling Jaya', costPerNight: 150 },
  { value: 'sa', label: 'Shah Alam', costPerNight: 120 },
];

const spaceOptions = [
  { value: 'pr', label: 'Private room', multiplier: 0.7 },
  { value: 'ep', label: 'Entire place', multiplier: 1.0 },
];

export function EstimateModal({ setLocationValue, setCostPerNight }: { setLocationValue?: (location: string) => void, setCostPerNight?: (cost: number) => void }) {
  const maxRooms = 8;
  const [locationValue, setLocationValueState] = React.useState<string>("kl");
  const [spaceMode, setSpaceMode] = React.useState<string>("ep");
  const [bedroomCount, setBedroomCount] = React.useState<number>(1);


  const [location, setLocation] = React.useState<string>("Kuala Lumpur");
  const [space, setSpace] = React.useState<string>("Entire place");
  const [bedrooms, setBedrooms] = React.useState<string>("1 bedroom");

  const updateSpaceMode = (mode: string) => {
    setSpaceMode(mode);
    if (mode === 'pr') {
      setBedroomCount(1);
    }
  }

  const updateBedrooms = (delta: number) => {
    if (bedroomCount === 1 && delta === -1) return;
    if (bedroomCount === maxRooms && delta === 1) return;
    setBedroomCount((prev) => Math.max(1, prev + delta));
  }

  const updateEstimate = () => {
    const selectedLocation = locationOptions.find(option => option.value === locationValue);
    if (selectedLocation) {
      setLocation(selectedLocation.label);
    }
    const selectedSpace = spaceOptions.find(option => option.value === spaceMode);
    if (selectedSpace) {
      setSpace(selectedSpace.label === 'pr' ? 'Private room' : 'Entire place');
    }
    setBedrooms(`${bedroomCount} ${bedroomCount === 1 ? 'bedroom' : 'bedrooms'}`);

    selectedLocation && selectedSpace && setCostPerNight && setCostPerNight(Math.round(selectedLocation.costPerNight * selectedSpace.multiplier * bedroomCount));
    setLocationValue && setLocationValue(locationValue);
  }

  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline" className='text-xl' size={'lg'}>
        <Search />{location} <p className='font-light'>&middot; {space} &middot; {bedrooms}</p>
      </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tell us about your home</DialogTitle>
          <DialogDescription>
          </DialogDescription>
          <div className="flex flex-col mb-4 space-y-1">
            <Label className="text-sm font-medium">Location</Label>
            <Select onValueChange={(value) => setLocationValueState(value)} value={locationValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Separator className="my-4" />
            <div className="w-full max-w-md">
              <FieldGroup>
                <FieldSet>
                  <FieldLabel htmlFor="compute-environment-p8w">
                    Type of space
                  </FieldLabel>
                  <RadioGroup value={spaceMode} onValueChange={updateSpaceMode}>
                    <FieldLabel htmlFor="ep">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Entire place</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="ep" id="ep" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="pr">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Private room</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="pr" id="pr" />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                </FieldSet>
              </FieldGroup>
            </div>
            <Separator className="my-4" />

            <div>
              <Label className={cn("text-sm font-medium mb-2 ", spaceMode === 'pr' ? 'text-gray-400' : '')}>Number of bedrooms</Label>
              <div className="flex items-center space-x-4 mt-2">
                <Button variant={'outline'} disabled={spaceMode === 'pr' || bedroomCount === 1} onClick={() => updateBedrooms(-1)}><Minus /></Button>
                <Label className={cn(spaceMode === 'pr' ? 'text-gray-400' : '')}>{bedroomCount}{bedroomCount === 8 ? '+' : ' '}</Label>
                <Button variant={'outline'} disabled={spaceMode === 'pr' || bedroomCount === maxRooms} onClick={() => updateBedrooms(1)}><Plus /></Button>
              </div>
            </div>
            <Separator className="my-4" />
            <div className='w-full'>
              <DialogClose asChild>
                <Button className='w-full' onClick={updateEstimate}>Update your estimate</Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
