using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task01.Data;
using Task01.Models;

namespace Task01.Areas.Admin.Controllers;

public class ObjectivesController : AdminControllerBase
{
    private readonly ApplicationDbContext _db;

    public ObjectivesController(ApplicationDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        var items = await _db.ConferenceObjectives
            .OrderBy(x => x.Order)
            .ToListAsync();
        return View(items);
    }

    public async Task<IActionResult> Create()
    {
        var nextOrder = await _db.ConferenceObjectives.AnyAsync()
            ? await _db.ConferenceObjectives.MaxAsync(x => x.Order) + 1
            : 0;
        return View(new ConferenceObjective { Order = nextOrder });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(ConferenceObjective model)
    {
        if (!ModelState.IsValid) return View(model);

        model.CreatedAt = DateTime.UtcNow;
        model.UpdatedAt = DateTime.UtcNow;
        _db.ConferenceObjectives.Add(model);
        await _db.SaveChangesAsync();
        TempData["Success"] = "تمت إضافة الهدف.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Edit(int id)
    {
        var item = await _db.ConferenceObjectives.FindAsync(id);
        if (item is null) return NotFound();
        return View(item);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(ConferenceObjective model)
    {
        if (!ModelState.IsValid) return View(model);

        var item = await _db.ConferenceObjectives.FindAsync(model.Id);
        if (item is null) return NotFound();

        item.Title = model.Title;
        item.Description = model.Description;
        item.Order = model.Order;
        item.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        TempData["Success"] = "تم حفظ التعديل.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _db.ConferenceObjectives.FindAsync(id);
        if (item is not null)
        {
            _db.ConferenceObjectives.Remove(item);
            await _db.SaveChangesAsync();
            TempData["Success"] = "تم حذف الهدف.";
        }
        return RedirectToAction(nameof(Index));
    }
}
